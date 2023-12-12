import mongoose, { Schema, model, Mongoose } from "mongoose";


const puestoSchema = new Schema({
    nPuesto: {
        type: String, // Puedes definir el tipo que prefieras (String, Number, etc.)
        unique: true, // Para garantizar que sea único
        required: true, // Para hacerlo requerido pl
      },
      available: {
        type: Boolean,
        required: true,
      }

})


puestoSchema.methods.changeAvalible = function(){
  this.available = !this.available

}


const puesto = model('Puesto', puestoSchema );

export default puesto