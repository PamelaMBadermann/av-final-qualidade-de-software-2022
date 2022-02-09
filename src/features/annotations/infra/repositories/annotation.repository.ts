import {
    ILike,
    IsNull,
    LessThan,
    MoreThanOrEqual,
    Not,
    Repository,
} from "typeorm";
import { DatabaseConnection } from "../../../../core/infra/database/connections/database";
import { Annotation } from "../../../../core/infra/database/entities/annotation.entity";
import { IAnnotation } from "../../domain/model/annotation.model";

export class AnnotationRepository {
    private readonly repository: Repository<Annotation>;

    constructor() {
        this.repository =
            DatabaseConnection.getConnection().getRepository(Annotation);
    }

    async findAll() {
        return await this.repository.find();
    }

    async find(uid: string) {
        return await this.repository.findOne(uid);
    }

    async create(annotation: IAnnotation) {
        const annotationEntity = this.repository.create(annotation);
        await this.repository.save(annotationEntity);

        return annotationEntity;
    }

    async findSecretAnnotations() {
        return await this.repository.find({
            where: {
                startDate: Not(IsNull()),
                endDate: LessThan(new Date()),
                description: ILike("secret"),
                user: {
                    idade: MoreThanOrEqual(18),
                },
            },
            relations: ["user"],
        });
    }
}
