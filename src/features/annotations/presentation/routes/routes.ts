import { Request, Response, Router } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { UserRepository } from "../../../user/infra/repositories/user-repository";
import { CreateAnnotationUseCase } from "../../domain/usecases/create-annotation-usecase";
import { FindAnnotationByIdUseCase } from "../../domain/usecases/find-annotation-by-id/find-annotation-by-id-usecase";
import { ListAnnotationsUseCase } from "../../domain/usecases/list-annotations-usecase";
import { AnnotationRepository } from "../../infra/repositories/annotation.repository";
import { CreateAnnotationController } from "../controllers/create-annotation-controller";
import { FindAnnotationByIdController } from "../controllers/find-annotation-by-id-controller";
import { ListAnnotationsController } from "../controllers/list-annotations-controller";

const data = [];

export class AnnotationRouter {
    static getRoutes() {
        const routes = Router();

        const annotationRepository = new AnnotationRepository();
        const userRepository = new UserRepository();
        const cacheRepository = new CacheRepository();

        const createAnnotationUseCase = new CreateAnnotationUseCase(
            annotationRepository,
            userRepository,
            cacheRepository
        );
        const listAnnotationsUseCase = new ListAnnotationsUseCase(
            annotationRepository,
            cacheRepository
        );

        const createAnnotationController = new CreateAnnotationController(
            createAnnotationUseCase
        );

        const listAnnotationsController = new ListAnnotationsController(
            listAnnotationsUseCase
        );

        routes.post("/", (req: Request, res: Response) =>
            createAnnotationController.execute(req, res)
        );

        routes.get("/", (req: Request, res: Response) =>
            listAnnotationsController.execute(req, res)
        );

        const findAnnotationByIdUseCase = new FindAnnotationByIdUseCase(
            annotationRepository,
            cacheRepository
        );
        const findAnnotationByIdController = new FindAnnotationByIdController(
            findAnnotationByIdUseCase
        );
        routes.get("/:id", (req: Request, res: Response) =>
            findAnnotationByIdController.execute(req, res)
        );

        return routes;
    }
}
