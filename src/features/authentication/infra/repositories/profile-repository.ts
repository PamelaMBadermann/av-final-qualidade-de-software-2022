import { Repository } from "typeorm";
import { DatabaseConnection } from "../../../../core/infra/database/connections/database";
import { Profile } from "../../../../core/infra/database/entities/profile.entity";
import { IProfile } from "../../domain/model/profile";

export class ProfileRepository {
    private repository: Repository<Profile>;

    constructor() {
        this.repository =
            DatabaseConnection.getConnection().getRepository(Profile);
    }

    async find(username: string) {
        return await this.repository.findOne(username);
    }

    async create(data: IProfile) {
        const profile = this.repository.create(data);
        await this.repository.save(profile);
    }

    async findWithPassword(username: string) {
        return await this.repository.findOne(username, {
            select: ["username", "password"],
        });
    }
}
