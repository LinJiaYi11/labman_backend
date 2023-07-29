import app from "../app.js";
import { v1Router } from "./routes/index.js";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/MySQL/db.js";
import cors from "cors";
import {corsOptions} from "./middleware/corslimits.js";
import errorMessages from "./utils/constants/errorMessages.js";
// import {startEmailTimer} from "./utils/timer/email/startEmailTimer.js";

dotenv.config();

app.use(cors(corsOptions));

const PORT = process.env.PORT||3000;

connectToDatabase();

app.use((error, req, res, next) => {
    console.error(error.stack); // Log error stack trace to the console

    if (Object.values(errorMessages).includes(error.message)) {
        res.status(404).json({ message: error.message });
    } else {
        res.status(500).json({ error: "Server Error" });
    }
});
app.use(v1Router);

// startEmailTimer();

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
