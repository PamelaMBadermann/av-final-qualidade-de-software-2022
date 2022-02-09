import { IUser } from "../../../user/domain/model/user";

export interface IAnnotation {
    uid: string;
    title: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    user?: IUser;
}