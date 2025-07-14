import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
            name: {
                        type: String,
                        required: true,
                        trim: true
            },
            email: {
                        type: String,
                        required: true,
                        unique: true,
                        lowercase: true,
                        trim: true
            },
            password: {
                        type: String,
                        required: true,
                        minlength: 6,
            },
            avatar: {
                        type: String,
                        default: ""
            },
            role: {
                        type: String,
                        enum: ["user", "admin", "seller"],
                        default: "user"
            }
});



userSchema.pre("save", async function (next) {
            if (!this.isModified("password")) return next();
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
}, { timestamps: true });

userSchema.methods.comparePassword = async function (password) {
            return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema);
export default User;