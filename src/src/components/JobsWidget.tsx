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
        let url = 'https://api.recruitwizard.com/v1/adverts' + token;

        try {
            const res = await fetch(url);            
            const content = await res.json();
            const data = JSON.parse(content) as IAdv;
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
            const category = classification[0].Text;
            const subCategory = classification[1].Text;
            const location = classification[2].Text;
            const workType = classification[3].Text;
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
            if (job.Title?.toLowerCase().includes(term)) return true;
            if (job.Summary?.toLowerCase().includes(term)) return true;
            let b = job.BulletPoints.BulletPoint.filter((v) => v.toLowerCase().includes(term));
            if (b.length > 0) return true;
            
            let c = job.Classifications.Classification.filter((v) => v.Text.toLowerCase().includes(term));
            if (c.length > 0) return true;

            return false;
        }
        
        return true;
    }

    render() {
        const filter = this.state.filter.toLowerCase();
        const data = this.state.data?.Job.filter((i) => this.filterFunction(i, filter));
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
                            <a href={item.Apply.Url} className="link">{item.Title}</a>
                        </h4>
                        {this.renderClassification(item.Classifications.Classification)}
                        {this.renderBulletPoints(item.BulletPoints.BulletPoint)}
                        {item.Summary}
                    </div>
                    );
                })
            }
        </div>
        );
    }
}