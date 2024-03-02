import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please enter Id"],
    },
    photo: {
        type: String,
        required: [true, "Please add photo"],
    },
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    email: {
        type: String,
        unique: [true, "Email Already  Exist"],
        required: [true, "Please enter name"],
        validate: validator.default.isEmail,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please enter gender"],
    },
    dob: {
        type: Date,
        required: [true, "Pease enter your birth"],
    },
}, {
    timestamps: true,
});
schema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
});
export const User = mongoose.model("User", schema);
