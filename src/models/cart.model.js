import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

/*
const cartSchema = new Schema({

})
*/

export const cartModel = model(cartCollection, cartSchema);