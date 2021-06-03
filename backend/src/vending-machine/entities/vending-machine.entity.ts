import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type VendingMachineDocument = VendingMachine & Document;

@Schema()
export class VendingMachine {
    @Prop()
    name: string;

    @Prop()
    balance: number;
}

export const VendingMachineSchema = SchemaFactory.createForClass(VendingMachine);
