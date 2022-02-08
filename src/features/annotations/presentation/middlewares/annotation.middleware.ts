// import { badRequest, ok } from "../../../../core/presentation";
// import { HttpRequest, HttpResponse } from "../../../../core/presentation";
// import { RequireFieldsValidator } from "../../../../core/presentation";
// import { Annotation } from "../../domain/model";

// export class AnnotationMiddleware {
//     private fields = ['title', 'userUID'];

//     async handle(request: HttpRequest): Promise<HttpResponse> {
//         const body: Annotation = request.body;

//         for (const field of this.fields) {
//             const error = new RequireFieldsValidator(field).validate(body);

//             if (error) {
//                 return badRequest(error);
//             }
//         }

//         return ok({});
//     }
// }

// export default async function AnottationUidNonExistent(request: Request, response: Response, next: NextFunction) {
//     const { uid } = request.params;

//     const extistentUid = await Anottation.findOne({ uid: uid });

//     if (!extistentUid) {
//         return response.status(404).json({
//             mensagem: "Esse Id de recado não existe."
//         });
//     }

//     next();
// }

// export default async function FillAnottation(request: Request, response: Response, next: NextFunction) {
//     const { title, description } = request.body;

//     if (!title || !description) {
//         return response.status(400).json({
//             mensagem: "Necessário preenchimento dod campos TÍTULO e DESCRIÇÃO para prosseguir."
//         });
//     }

//     next();
// } 

// export default async function LengthDescriptionAnottation(request: Request, response: Response, next: NextFunction) {
//     const { description } = request.body;

//     if (description > 150 ) {
//         return response.status(400).json({
//             mensagem: "Descrição não pode ultrapassar 50 caracteres."
//         })
//     }
// } 

// export default async function LengthTitleAnottation(request: Request, response: Response, next: NextFunction) {
//     const { title } = request.body;

//     if (title > 50 ) {
//         return response.status(400).json({
//             mensagem: "Título não pode ultrapassar 50 caracteres."
//         })
//     }
// } 

// export default async function UserUidNonexistent(request: Request, response: Response, next: NextFunction) {
//     const { userUID } = request.params;

//     const existentUid = await User.findOne({ uid: userUID });

//     if (!existentUid) {
//         return response.status(404).json({
//             mensagem: "Este usuário não existe."
//         });
//     }

//     next();
// } 