import { UseCase } from "../../../../core/domain/contracts/usecase";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { AnnotationRepository } from "../../infra/repositories/annotation.repository";

export class ListAnnotationsUseCase implements UseCase {
    constructor(
        private repository: AnnotationRepository,
        private cacheRepository: CacheRepository
    ) {}

    async run() {
        // const cachedAnnotations = await this.cacheRepository.get("annotation:all");
        // if (cachedAnnotations) {
        //     return cachedAnnotations;
        // }

        const result = await this.repository.findSecretAnnotations();

        await this.cacheRepository.hset("annotation", "annotation:all", result);

        return result;
    }
}
