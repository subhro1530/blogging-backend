import mongoose from "mongoose";

export default function main() {
    try {
        mongoose.connect("mongodb+srv://me:me@cluster0.fubxi8b.mongodb.net/?retryWrites=true&w=majority", {})
            .then(() => console.log("Connected to the db"))
    } catch (e) {
        console.log("Error connecting to the database", e)
    }
}

