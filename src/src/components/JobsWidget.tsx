import React from "react";
import { IAdv } from '../interfaces/Adv';
import { IJob } from '../interfaces/job';
import { IClassification } from "../interfaces/classification";
import './JobsWidget.css';

interface JWState {
    data: IAdv | null,
    filter: string,
    // token: string
}

export default class JobsWidget extends React.Component<any, JWState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: null,
            filter: ''
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData(){
        let token = window.location.pathname;
        let url = 'https://recruitwizard.app/api/adverts'+ token + '/json';

        try {
            const res = await fetch(url);            
            const data = (await res.json()) as IAdv;
            
            console.log(data);
            
            this.setState({data: data});            
        } catch (error) {
        }

    }

    handleFilter = (event: any) => {
        this.setState({ filter: event.target.value });
    }

    renderBulletPoints = (list: any[]) => {
        return (
            <ul>
                {list.length > 0 && 
                    list.map((item, index) => {
                        return <li key={index}>{item}</li>;
                    })
                }
            </ul>
        );
    }

    renderClassification = (classification: IClassification[]) => {
        if (classification.length === 4) {
            const category = classification[0].text;
            const subCategory = classification[1].text;
            const location = classification[2].text;
            const workType = classification[3].text;
            return (
                <div>
                    <span className="bold">{location}</span> - <span>{workType}</span>
                    <br />
                    <span className="bold">{category}</span> - <span>{subCategory}</span>
                </div>
            );
        }
    }

    filterFunction = (job: IJob, term: string) => {
        if (term) {
            if (job.title?.toLowerCase().includes(term)) return true;
            if (job.summary?.toLowerCase().includes(term)) return true;
            let b = job.bulletPoints.bulletPoint.filter((v) => v.toLowerCase().includes(term));
            if (b.length > 0) return true;
            
            let c = job.classifications.classification.filter((v) => v.text.toLowerCase().includes(term));
            if (c.length > 0) return true;

            return false;
        }
        
        return true;
    }

    render() {
        const filter = this.state.filter.toLowerCase();
        const data = this.state.data?.job.filter((i) => this.filterFunction(i, filter));
        return (
        <div className="container">
            <div className="card-filter">
                <div className="card-header">
                    <h4 className="no-margin">Jobs</h4>
                </div>
                <div className="card-body">
                    <input onChange={this.handleFilter} placeholder="Search Jobs" className="form-control" />
                </div>
            </div>
            {(data) &&
                data.map((item, index) => {
                    return (
                    <div key={index} className="card">
                        <h4>
                            <a href={item.apply.url} className="link">{item.title}</a>
                        </h4>
                        {this.renderClassification(item.classifications.classification)}
                        {this.renderBulletPoints(item.bulletPoints.bulletPoint)}
                        {item.summary}
                    </div>
                    );
                })
            }
        </div>
        );
    }
}