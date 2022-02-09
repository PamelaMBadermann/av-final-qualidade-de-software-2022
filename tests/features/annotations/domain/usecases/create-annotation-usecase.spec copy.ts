// import { NotFoundError } from "../../../../../src/core/domain/errors/not-found-error";
// import {
//     DatabaseConnection,
//     RedisConnection,
// } from "../../../../../src/core/infra/database/connections";

// import { CacheRepository } from "../../../../../src/core/infra/repositories/cache.repository";
// import {
//     CreateAnnotationUseCase,
//     IUserRepository,
// } from "../../../../../src/features/annotations/domain/usecases/create-annotation-usecase";
// import { AnnotationRepository } from "../../../../../src/features/annotations/infra/repositories/annotation.repository";
// import { IUser } from "../../../../../src/features/user/domain/model/user";
// import { UserRepository } from "../../../../../src/features/user/infra/repositories/user-repository";

// describe("Create Annotation UseCase tests", () => {
//     const makeSut = () => {
//         const userRepo = new UserRepository();
//         const annotationRepo = new AnnotationRepository();
//         const cacheRepo = new CacheRepository();

//         const sut = new CreateAnnotationUseCase(annotationRepo, userRepo, cacheRepo);
//         return sut;
//     };

//     beforeAll(async () => {
//         await DatabaseConnection.initConnection();
//         RedisConnection.initConnection();
//     });

//     afterAll(async () => {
//         await DatabaseConnection.closeConnection();
//         await RedisConnection.closeConnection();
//     });

//     beforeEach(async () => {
//         const userRepo = new UserRepository();
//         const annotationRepo = new AnnotationRepository();

//         await annotationRepo.clear();
//         await userRepo.clear();
//     });

//     const makeUsers = async () => {
//         const user = {
//             cpf: "123",
//             nome: "teste",
//             username: "teste",
//         };

//         const user2 = {
//             cpf: "123",
//             nome: "teste",
//             username: "teste-dois",
//         };

//         await new UserRepository().create(user);
//         await new UserRepository().create(user2);

//         return {
//             user,
//             user2,
//         };
//     };

//     test("deveria gerar NotFoundError se o usuario não existe", async () => {
//         const sut = makeSut();

//         expect.assertions(3);

//         try {
//             await sut.run({
//                 username: "teste",
//                 description: "any_description",
//                 title: "any_title",
//                 uid: "any_uid",
//             });
//         } catch (error) {
//             expect(error).toBeInstanceOf(NotFoundError);

//             const err = error as NotFoundError;
//             expect(err.name).toEqual("NotFoundError");
//             expect(err.message).toEqual("user not found.");
//         }
//     });

//     test("deveria retornar ok se o projeto for criado", async () => {
//         const sut = makeSut();
//         const { user } = await makeUsers();

//         const annotation = {
//             username: user.username,
//             uid: "any_uid",
//             description: "any_description",
//             title: "any_title",
//         };

//         const result = await sut.run(annotation);

//         expect(result).toBeTruthy();
//         expect(result.description).toEqual(annotation.description);
//         expect(result.title).toEqual(annotation.title);
//         expect(result.endDate).toBeFalsy();

//         expect(result.user).toBeTruthy();
//         expect(result.user.username).toEqual(user.username);
//     });

//     test("deveria retornar ok se o projeto for criado com endDate", async () => {
//         const sut = makeSut();
//         const { user2: teste } = await makeUsers();

//         const annotation = {
//             username: teste.username,
//             description: "any_description",
//             title: "any_title",
//             uid: "any_uid",
//             endDate: new Date(),
//         };

//         const result = await sut.run(annotation);

//         expect(result).toBeTruthy();
//         expect(result.description).toEqual(annotation.description);
//         expect(result.title).toEqual(annotation.title);
//         expect(result.endDate).not.toBeFalsy();

//         expect(result.user).toBeTruthy();
//         expect(result.user.username).toEqual(teste.username);
//     });
// });