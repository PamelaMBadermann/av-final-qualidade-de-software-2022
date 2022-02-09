import { create } from "domain";
import { UseCase } from "../../../../core/domain/contracts/usecase";
import { NotFoundError } from "../../../../core/domain/errors/not-found-error";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { IUser } from "../../../user/domain/model/user";
import { UserRepository } from "../../../user/infra/repositories/user-repository";
import { AnnotationRepository } from "../../infra/repositories/annotation.repository";

export interface CreateAnnotationParams {
    username: string;
    name: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
}

export interface IUserRepository {
    find(username: string): Promise<IUser | undefined>;
    create(user: IUser): Promise<void>;
}

export class CreateAnnotationUseCase implements UseCase {
    constructor(
        private repository: AnnotationRepository,
        private userRepository: IUserRepository,
        private cacheRepository: CacheRepository
    ) {}

    async run(annotation: CreateAnnotationParams) {
        const user = await this.userRepository.find(annotation.username);

        if (!user) {
            throw new NotFoundError("user");
        }

        const toCreateAnnotation = {
            ...annotation,
            user,
        };

        // Create no BD relacional
        const created = await this.repository.create(toCreateAnnotation);

        // Set no Redis
        await this.cacheRepository.set(
            `annotation:${created.uid}`,
            toCreateAnnotation
        );

        return created;
    }
}
