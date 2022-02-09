import { IAnnotation } from "../../../annotations/domain/model/annotation.model";

export interface IImpediment {
    uid?: string;
    name: string;
    description: string;
    active: boolean;
    annotation: IAnnotation;
}
