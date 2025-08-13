export class APIError extends Error {
    constructor({ message }: { message: string }) {
        super(message);
        this.name = "APIError";
    }
}
