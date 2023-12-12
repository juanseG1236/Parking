import mongoose, { Schema, model, Mongoose } from "mongoose";
import Vehicle from '../models/vehicleMd.js' // Asegúrate de que la ruta sea correcta


const reserveSchema = new Schema({

      date: {
        type: Date,
        required: true,
      
      },
      vehiclePlate: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicle', // Referencia al modelo Usuario
      }


})

const reserve = model('Reserve', reserveSchema );

export default reserve