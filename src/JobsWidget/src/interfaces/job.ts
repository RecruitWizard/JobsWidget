import { IBulletPoints } from "./bullet-points";
import { IApply } from "./apply";
import { IClassifications } from "./classifications";

export interface IJob {
    Title: string,
    Expired:string,
    Summary:string,
    Description:string
    BulletPoints: IBulletPoints
    Apply: IApply
    Classifications:IClassifications

}
