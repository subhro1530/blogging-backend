import mongoose from "mongoose"
import IUser from "../Interfaces/User"

const UserSchema = new mongoose.Schema<IUser>({
    name : {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String,
        required: true,
    }
})


export default mongoose.model<IUser>("user", UserSchema)