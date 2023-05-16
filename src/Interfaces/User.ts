import { Document } from "mongodb"

export default interface user extends Document {
    name: string,
    email: string,
    date: Date,
    password: string
}