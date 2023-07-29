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

app.use(v1Router);

app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack trace to the console

    if (Object.values(errorMessages).includes(err.message)) {
        res.status(404).json({ message: err.message });
    } else {
        res.status(500).json({ error: "incorrect password" });
    }
});

// startEmailTimer();

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
