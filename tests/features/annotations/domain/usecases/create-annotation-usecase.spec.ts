import { NotFoundError } from "../../../../../src/core/domain/errors/not-found-error";
import {
    DatabaseConnection,
    RedisConnection,
} from "../../../../../src/core/infra/database/connections";

import { CacheRepository } from "../../../../../src/core/infra/repositories/cache-repository";
import {
    CreateAnnotationUseCase,
    IUserRepository,
} from "../../../../../src/features/annotations/domain/usecases/create-annotation-usecase";
import { AnnotationRepository } from "../../../../../src/features/annotations/infra/repositories/annotation-repository";
import { IUser } from "../../../../../src/features/user/domain/model/user";
import { UserRepository } from "../../../../../src/features/user/infra/repositories/user-repository";

// class MockUserRepository implements IUserRepository {
//     find(username: string) {
//         if (username === undefined) {
//             return undefined;
//         }

//         if (username === "teste_mock_erro") {
//             throw new Error();
//         }
//     }

//     async create(_: IUser) {}
// }

describe("Create Annotation UseCase tests", () => {
    jest.mock(
        "../../../../../src/features/user/infra/repositories/user-repository"
    );

    const makeSut = () => {
        const userRepo = new UserRepository();
        const annotationRepo = new AnnotationRepository();
        const cacheRepo = new CacheRepository();

        const sut = new CreateAnnotationUseCase(annotationRepo, userRepo, cacheRepo);
        return sut;
    };

    beforeAll(async () => {
        await DatabaseConnection.initConnection();
        RedisConnection.initConnection();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("deveria gerar NotFoundError se o usuario não existe", async () => {
        const spyTest = jest
            .spyOn(UserRepository.prototype, "find")
            .mockResolvedValue(undefined);

        const sut = makeSut();

        expect.assertions(4);

        try {
            await sut.run({
                username: "teste",
                description: "any_description",
                name: "any_name",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);

            expect(spyTest).toHaveBeenCalledWith("teste");

            const err = error as NotFoundError;
            expect(err.name).toEqual("NotFoundError");
            expect(err.message).toEqual("user not found.");
        }
    });
});
