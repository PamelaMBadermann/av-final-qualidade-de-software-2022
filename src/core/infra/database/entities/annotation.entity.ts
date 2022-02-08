import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { IProject } from "../../../../features/annotations/domain/model/project";
import { User } from "./User";
import { v4 as createUuid } from "uuid";
import { IAnnotation } from "../../../../features/annotations/domain/model/IAnnotation";
import { Annotation } from "./Annotation";

@Entity()
export class Project implements IProject {
    @PrimaryColumn({
        type: "uuid",
    })
    uid: string;

    @Column({
        length: 30,
    })
    name: string;

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

    // @OneToMany(() => Impediment, (impediment) => impediment.project)
    // impediments: IImpediment[];

    constructor() {
        this.uid = createUuid();
    }
}
