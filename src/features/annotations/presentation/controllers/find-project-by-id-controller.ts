import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
    badRequest,
    ok,
    serverError,
} from "../../../../core/presentation/helpers/http-handler";
import { FindAnnotationByIdUseCase } from "../../domain/usecases/find-annotation-by-id/find-annotation-by-id-usecase";

export class FindAnnotationByIdController implements Controller {
    constructor(private findAnnotationByIdUseCase: FindAnnotationByIdUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id) {
                return badRequest(res, "ID não informado");
            }

            const annotation = await this.findAnnotationByIdUseCase.run({
                id,
            });

            return ok(res, annotation);
        } catch (error) {
            return serverError(res, error);
        }
    }
}
