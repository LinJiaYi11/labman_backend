import express from "express";
import cors from "cors";
import {corsOptions} from "./middleware/corslimits.js";

const app = express();
app.use(cors(corsOptions));

app.use(express.json());

export default app;
