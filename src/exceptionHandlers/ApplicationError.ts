class ApplicationError extends Error {
  constructor(message?: any, status?: number) {
    super();
    this.message = `{"message": "${message || "Something went wrong. Please try again."}","status": ${status || 500}}`;
  }
}
export default ApplicationError;