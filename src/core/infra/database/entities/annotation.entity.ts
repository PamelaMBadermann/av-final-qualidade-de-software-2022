import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { IAnnotation } from "../../../../features/annotations/domain/model/annotation.model";
import { User } from "./user.entity";
import { v4 as createUuid } from "uuid";
import { IImpediment } from "../../../../features/impediments/domain/models/IImpediment.model";
import { Impediment } from "./impediment.entity";

@Entity()
export class Annotation implements IAnnotation {
    @PrimaryColumn({
        type: "uuid",
    })
    uid: string;

    @Column({
        length: 30,
    })
    title: string;

    @Column({
        length: 30,
    })
    description: string;

    @Column({
        nullable: true,
    })
    startDate: Date;

    @Column({
        nullable: true,
    })
    endDate: Date;

    @ManyToOne(() => User, {})
    @JoinColumn({
        name: "username",
    })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Impediment, (impediment) => impediment.annotation)
    impediments: IImpediment[];

    constructor() {
        this.uid = createUuid();
    }
}
