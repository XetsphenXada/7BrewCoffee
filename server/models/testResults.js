import { Schema, model } from "mongoose";

const testResultSchema = new Schema({
    user: Object,
    date: Date,
    numCorrect: Number,
    numIncorrect: Number,
    questions: Array,
    score: Number
});

export default model("TestResult", testResultSchema);
