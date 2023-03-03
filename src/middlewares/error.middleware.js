
const errorMiddleware = (error, req, res, next) => {
    try {
        const status = error.status || 500
        const message = error.message || 'Something went wrong'

        res.status(status).json({ message })
    } catch (error) {
        next(error)
    }
}

export default errorMiddleware
