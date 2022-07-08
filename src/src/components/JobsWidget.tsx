import React, { useEffect, useState } from "react";
import { IAdv } from '../interfaces/Adv';
import { IClassification, IJob, ISalary } from '../interfaces/job';
import './JobsWidget.css';

interface JWState {
    data: IAdv | null,
    filter: string,
    // token: string
}

const apiURL = 'https://api.recruitwizard.com/api/adverts/json';

const RenderBulletPoints = (list: any[]) => {
    return (
        <ul className="bullet-points">
            {list.length > 0 &&
                list.map((item, index) => {
                    return <li key={index}>{item}</li>;
                })
            }
        </ul>
    );
};

const RenderBadges = (classification: IClassification[], salary: ISalary) => {
    let locationText = '';
    let workTypeText = '';

    const location = classification.find(c => c.Name.toLowerCase() === 'location');
    if (location) locationText = `${location.Name}: ${location.Text}`;

    const workType = classification.find(c => c.Name.toLowerCase() === 'work type');
    if (workType) workTypeText = `${workType.Name}: ${workType.Text}`;

    const badgeClass = "badge badge-pill badge-light"
    return (
        <>
            <span className={badgeClass}>{`$${salary.Text}`}</span>{'\u00a0'}
            <span className={badgeClass}>{locationText}</span>{'\u00a0'}
            <span className={badgeClass}>{workTypeText}</span>
        </>
    );
};


export default function JobsWidget() {
    const [jobs, setJobs] = useState<IAdv | null>(null);

    useEffect(() => {
        const getData = async () => {
            const token = window.location.pathname;
            try {
                const res = await fetch(apiURL + token);
                const data = (await res.json()) as IAdv;
                setJobs(data);
            } catch (error) {                
            }
        };
        getData();
    }, []);

    return (
        <div className="container">
            <ul className="list-group" >
                {jobs &&
                    jobs.Job.map((item, index) => (
                        <li key={index} className="list-group-item">
                            <h4>{item.Title}</h4>
                            <p>{item.Summary}</p>
                            {RenderBulletPoints(item.BulletPoints.BulletPoint)}
                            <br />
                            {RenderBadges(item.Classifications.Classification, item.Salary)}
                            <br />
                            <br />
                            <a className="btn btn-primary" href={item.Apply.Url} target="_blank" rel="noreferrer noopener">Find Out More</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}