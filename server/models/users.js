import { Schema, model } from "mongoose";

const userSchema = new Schema({
    employeeID: String,
    passwordHash: {
        type: String,
        required: true
    },
    firstName: String,
    middleName: String,
    lastName: String,
    role: Object,
    storeLocation: String,
    brewistas: Array,
    email: {
        type: String,
        required: true
    }
});

export default model("User", userSchema);