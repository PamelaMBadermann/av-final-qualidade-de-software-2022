import { UseCase } from "../../../../core/domain/contracts/usecase";
import { NotFoundError } from "../../../../core/domain/errors/not-found-error";
import { Impediment } from "../../../../core/infra/database/entities/impediment.entity";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { FindAnnotationByIdUseCase } from "../../../annotations/domain/usecases/find-annotation-by-id/find-annotation-by-id-usecase";
import { ImpedimentRepository } from "../../infra/repositories/ImpedimentRepository";

export interface ICreateImpediment {
    name: string;
    description: string;
    active: boolean;
    annotation_uid: string;
}

export class CreateImpedimentUseCase implements UseCase {
    constructor(
        private repository: ImpedimentRepository,
        private findAnnotationById: FindAnnotationByIdUseCase,
        private cacheRepo: CacheRepository
    ) {}
    async run(data: ICreateImpediment): Promise<any> {
        const annotation = await this.findAnnotationById.run({
            id: data.annotation_uid,
        });
        if (!annotation) {
            throw new NotFoundError("Annotation");
        }

        const result = await this.repository.create({
            ...data,
            annotation,
        });

        await this.cacheRepo.set(
            `impediment:${result.uid}`,
            JSON.stringify(data)
        );

        await this.cacheRepo.delete("impediment:all");
    }
}
