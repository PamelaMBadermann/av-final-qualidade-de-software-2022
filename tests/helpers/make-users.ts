import { UserRepository } from "../../src/features/user/infra/repositories/user-repository";

export const makeUsers = async () => {
    const user = {
        cpf: "123",
        nome: "teste",
        username: "teste",
    };

    const user2 = {
        cpf: "123",
        nome: "teste",
        username: "teste-dois",
    };

    await new UserRepository().create(user);
    await new UserRepository().create(user2);

    return {
        user,
        user2,
    };
};