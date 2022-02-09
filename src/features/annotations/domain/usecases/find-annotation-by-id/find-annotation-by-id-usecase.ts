import { UseCase } from "../../../../../core/domain/contracts/usecase";
import { NotFoundError } from "../../../../../core/domain/errors/not-found-error";
import { CacheRepository } from "../../../../../core/infra/repositories/cache.repository";
import { AnnotationRepository } from "../../../infra/repositories/annotation.repository";
import { IAnnotation } from "../../model/annotation.model";
import { FindAnnotationByIdParams } from "./models/find-annotation-by-id-params";

export class FindAnnotationByIdUseCase implements UseCase {
    constructor(
        private repository: AnnotationRepository,
        private cacheRepository: CacheRepository
    ) {}

    async run(data: FindAnnotationByIdParams) {
        try {
            const cachedAnnotation = await this.cacheRepository.get(
                `annotation:${data.id}`
            );
            if (cachedAnnotation) {
                return {
                    ...cachedAnnotation,
                    cache: true,
                };
            }

            let annotation: IAnnotation | undefined = await this.repository.find(
                data.id
            );

            if (!annotation) throw new NotFoundError("Annotation");

            return annotation;
        } catch (error: any) {
            throw new Error(error.toString());
        }
    }
}
