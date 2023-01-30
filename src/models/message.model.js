import { Schema, model } from 'mongoose';

const messageCollection = 'messages';

const messageSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
})

export const messagetModel = model(messageCollection, messageSchema);