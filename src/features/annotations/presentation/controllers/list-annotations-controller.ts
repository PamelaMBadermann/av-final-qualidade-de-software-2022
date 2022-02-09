import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller.contract";
import {
    ok,
    serverError,
} from "../../../../core/presentation/helpers/http-handler";
import { ListAnnotationsUseCase } from "../../domain/usecases/list-annotations-usecase";

export class ListAnnotationsController implements Controller {
    constructor(private listAnnotationsUseCase: ListAnnotationsUseCase) {}

    async execute(_: Request, res: Response) {
        try {
            const result = await this.listAnnotationsUseCase.run();

            return ok(res, result);
        } catch (error) {
            return serverError(res, error);
        }
    }
}
