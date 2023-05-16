import { Document } from "mongodb";

export default interface post extends Document {
    title: string,
    body: string,
    date: Date,
    userEmail: string,
}
