export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (err = {}, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal server error";

  if (err?.name === "CastError") {
    const message = `Invalid: Resource not found ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default errorMiddleware;
