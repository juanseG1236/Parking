import mongoose, { Schema, model, Mongoose } from "mongoose";
import User from '../models/userMd.js' // Asegúrate de que la ruta sea correcta


const vehicleSchema = new Schema({
    plate: {
        type: String, // Puedes definir el tipo que prefieras (String, Number, etc.)
        unique: true, // Para garantizar que sea único
        required: true, // Para hacerlo requerido pl
        maxlength: 6,
        minlength: 6
      },
      color: {
        type: String,
        required: true,
        minlength: 2, // Mínimo 2 caracteres
        maxlength: 20, // Máximo 50 caracteres
      },
      type: {
        type: String,
        enum: ['automovil', 'motocicleta', 'bicicleta'],
        required: true,
      },
      userIdUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo Usuario
      }


})

const vehicle = model('Vehicle', vehicleSchema );

export default vehicle