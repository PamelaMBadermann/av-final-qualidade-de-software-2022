import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller.contract";
import {
    ok,
    serverError,
} from "../../../../core/presentation/helpers/http-handler";
import { CreateAnnotationUseCase } from "../../domain/usecases/create-annotation-usecase";

export class CreateAnnotationController implements Controller {
    constructor(private createAnnotationUseCase: CreateAnnotationUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const { username, title, description, startDate, endDate } =
                req.body;

            // ....

            await this.createAnnotationUseCase.run({
            username,
            title,
            description,
            startDate,
            endDate,
            uid: "",
        });

            return ok(res, "Annotation was successfully created");
        } catch (error) {
            return serverError(res, error);
        }
    }
}
