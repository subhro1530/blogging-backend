import mongoose from "mongoose"

export default function main() {
    try {
        mongoose
            .connect(
                "mongodb://me:me@ac-wy0s1x1-shard-00-00.fubxi8b.mongodb.net:27017,ac-wy0s1x1-shard-00-01.fubxi8b.mongodb.net:27017,ac-wy0s1x1-shard-00-02.fubxi8b.mongodb.net:27017/?ssl=true&replicaSet=atlas-11t0ex-shard-0&authSource=admin&retryWrites=true&w=majority",
                {}
            )
            .then(() => console.log("Connected to the db"))
    } catch (e) {
        console.log("Error connecting to the database", e)
    }
}
