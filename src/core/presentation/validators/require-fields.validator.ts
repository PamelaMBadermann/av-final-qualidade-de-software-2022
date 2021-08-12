import { MissingParamError } from './../errors';

export class RequireFieldsValidator {
    readonly #fieldName: string;

    constructor(fieldName: string) {
        this.#fieldName = fieldName;
    }

    public validate(input: any): Error | null {
        if (!input[this.#fieldName]) {
            return new MissingParamError(this.#fieldName);
        }

        return null;
    }
}