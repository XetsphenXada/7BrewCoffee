import { Schema, model } from "mongoose";

const userSchema = new Schema({
    employeeID: String,
    passwordHash: String,
    firstName: String,
    middleName: String,
    lastName: String,
    role: Object,
    storeLocation: String,
    brewistas: Array
});

export default model("User", userSchema);