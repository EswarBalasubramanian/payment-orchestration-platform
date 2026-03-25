import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  status: 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'TIMEOUT';

  @Prop({ default: 0 })
  retryCount: number;

  @Prop()
  latency: number;

  @Prop({ type: [String], default: [] })
  logs: string[];
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
