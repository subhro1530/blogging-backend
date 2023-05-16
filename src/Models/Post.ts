import IPost from "../Interfaces/Post"
import mongoose from "mongoose"


const postSchema = new mongoose.Schema<IPost>({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model<IPost>("post", postSchema)