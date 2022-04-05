import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {ObjectId} from "mongoose";

export type UserLimitDocument = UserLimit & Document;

@Schema()
export class UserLimit {
    @Prop()
    userId: string;

    @Prop()
    limit: number;

    @Prop()
    limitDate: Date;
}

export const UserLimitSchema = SchemaFactory.createForClass(UserLimit);