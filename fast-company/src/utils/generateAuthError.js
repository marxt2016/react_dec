function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Invalid password or email";
        case "EMAIL_NOT_FOUND":
            return "Invalid password or email";
        case "EMAIL_EXISTS":
            return "Email registered";
        default:
            return "Too much login attempts";
    }
}
export default generateAuthError;
