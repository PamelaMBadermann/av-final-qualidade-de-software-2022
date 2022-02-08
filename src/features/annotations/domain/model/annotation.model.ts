import { IUser } from "../../../user/domain/model/user";

export interface Annotation {
    uid: string;
    title: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    user?: IUser;
}