
export interface IClassification {
    id: string,
    Name: string,
    Text: string,
}

export interface ISalary {
    MinValue: string,
    MaxValue: string,
    Text: string,
    Period: string,
}


export interface IJob {
    Title: string,
    Expired: boolean,
    Summary: string,
    Description: string,
    BulletPoints: {
        BulletPoint: string[]
    },
    Salary: ISalary,
    Classifications: {
        Classification: IClassification[]
    },
    Apply: {
        Url: string
    },
    id: string | null,
    Reference: string,
    DatePosted: string,
    DateUpdated: string,
    Recruiter: string | null
}
