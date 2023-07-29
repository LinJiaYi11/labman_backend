import errorMessages from "./utils/constants/errorMessages.js";

function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log error stack trace to the console

    if (Object.values(errorMessages).includes(err.message)) {
        res.status(400).json({ error: "Bad request: " + err.message });
    } else {
        console.error(err.stack);
        res.status(500).json({ error: "Internal error: " + err.message });
    }
}

export default errorHandler;
