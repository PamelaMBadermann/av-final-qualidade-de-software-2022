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

export class ListImpedimentsUseCase implements UseCase {
    constructor(
        private repository: ImpedimentRepository,
        private cacheRepo: CacheRepository
    ) {}
    async run(): Promise<any> {
        const cachedImpediments = await this.cacheRepo.get("impediment:all");
        if (cachedImpediments) {
            return cachedImpediments;
        }

        const result = await this.repository.findAll();

        await this.cacheRepo.set(`impediment:all`, JSON.stringify(result));
    }
}
