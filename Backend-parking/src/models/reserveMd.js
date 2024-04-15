import mongoose, { Schema, model, Mongoose } from "mongoose";
import Vehicle from '../models/vehicleMd.js' // Asegúrate de que la ruta sea correcta
import { format } from 'date-fns';


const reserveSchema = new Schema({

      date: {
        type: Date,
        required: true,
        get: formatTime

      
      },
      vehiclePlate: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicle', // Referencia al modelo Usuario
      }


},{ toJSON: { getters:true } });

//format date
function formatTime(timeEntry){
  console.log("paso")
    return timeEntry = format(timeEntry, "MMM d, hh:mm a")
}

const reserve = model('Reserve', reserveSchema );

export default reserve