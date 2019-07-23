import { Document } from 'mongoose';

export interface Route extends Document {
    readonly applicationName: string;
    path: [];
    readonly target: string;
    readonly headers: object;
    readonly logLevel: string;
}