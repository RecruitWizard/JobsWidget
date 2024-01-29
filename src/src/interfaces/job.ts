import { IBulletPoints } from "./bullet-points";
import { IApply } from "./apply";
import { ILinks } from "./links";
import { IClassifications } from "./classifications";

export interface IJob {
    title: string,
    expired:string,
    summary:string,
    description:string,
    bulletPoints: IBulletPoints,
    apply: IApply,
    links: ILinks,
    classifications:IClassifications
}
