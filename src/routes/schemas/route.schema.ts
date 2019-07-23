import { Schema } from "mongoose";

export const RouteSchema = new Schema({
    applicationName: {
        type: String,
        required: true
    },
    path: {
        type: Array,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    headers: Object,
    logLevel: String
})