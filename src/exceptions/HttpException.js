export class HttpException {
    status
    message

    constructor(status, message) {
        super(message)
        this.status = status
        this.message = message
    }
}
