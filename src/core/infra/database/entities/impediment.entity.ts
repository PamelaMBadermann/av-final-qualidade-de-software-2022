import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as createUuid } from "uuid";
import { IImpediment } from "../../../../features/impediments/domain/models/IImpediment.model";
import { IAnnotation } from "../../../../features/annotations/domain/model/annotation.model";
import { Annotation } from "./annotation.entity";

@Entity()
export class Impediment implements IImpediment {
    @PrimaryColumn({
        type: "uuid",
    })
    uid: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    description: string;

    @Column()
    active: boolean;

    @ManyToOne((_) => Annotation)
    @JoinColumn({
        name: "annotation_uid",
    })
    annotation: IAnnotation;

    constructor() {
        this.uid = createUuid();
    }
}
