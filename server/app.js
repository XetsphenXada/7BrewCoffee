import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import flashcardRouter from "./controllers/flashcards.js";

//creating variables
const app = express();
const PORT = process.env.SERVER_PORT;
const MONGO = process.env.MONGODB;

//connecting to database
mongoose.connect(`${MONGO}`);

//creating database variable
const db = mongoose.connection;

app.use(express.json());
app.use(cors());
app.use("/", flashcardRouter);


//printing to the console when connection is established
db.once('open', () => console.log(`connected to Mongo Atlas DB`));

//printing to the console what port is being used
app.listen(PORT, () => { console.log(`listening on port: ${PORT}`) })