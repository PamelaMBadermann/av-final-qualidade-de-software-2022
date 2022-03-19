import { NotFoundError } from "../../../../../src/core/domain/errors/not-found-error";
import {
    DatabaseConnection,
    RedisConnection,
} from "../../../../../src/core/infra/database/connections";
import { CacheRepository } from "../../../../../src/core/infra/repositories/cache.repository";
import {
    CreateAnnotationUseCase,
    IUserRepository,
} from "../../../../../src/features/annotations/domain/usecases/create-annotation-usecase";
import { AnnotationRepository } from "../../../../../src/features/annotations/infra/repositories/annotation.repository";
import { IUser } from "../../../../../src/features/user/domain/model/user";
import { IAnnotation } from "../../../../../src/features/annotations/domain/model/annotation.model";
import { UserRepository } from "../../../../../src/features/user/infra/repositories/user-repository";


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

        const user = {
            cpf: "123",
            nome: "any_name",
            username: "any_username",
            idade: 20,
            created_at: new Date()
        };

        jest.spyOn(UserRepository.prototype, "find").mockResolvedValue(user);

        expect.assertions(4);

        try {
            await sut.run({
                username: user.username,
                description: "any_description",
                title: "any_title",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);

            const err = error as NotFoundError;
            expect(err.name).toEqual("NotFoundError");
            expect(err.message).toEqual("user not found.");
        }
    });

    // test("deveria retornar 200 se a anotação for criada", async () => {
    //     const sut = makeSut();

    //     const user = {
    //         cpf: "123",
    //         nome: "any_name",
    //         username: "any_username",
    //         idade: 20,
    //         created_at: new Date()
    //     };

    //     jest.spyOn(UserRepository.prototype, "find").mockResolvedValue(user);

    //     const annotation = {
    //         uid: "e781b7f7-c481-4b9a-9f78-34420955712e",
    //         description: "any_description",
    //         title: "any_title",
    //         username: user.username,
    //     };

    //     const result = await sut.run(annotation);

    //     expect(result).toBeTruthy();
    //     expect(result.description).toEqual(annotation.description);
    //     expect(result.title).toEqual(annotation.title);
    // });
});
