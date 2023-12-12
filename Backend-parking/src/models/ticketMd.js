import mongoose, { Schema, model, Mongoose } from "mongoose";


const ticketSchema = new Schema({
      timeEntry: {
        type: Date,
        required: true,
      },
      idPuesto: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Puesto', // Referencia al modelo Usuario
      },
      idVehicle: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicle', // Referencia al modelo Usuario
      },
      tariff:{
        type: Number,
        required: true,
      },
      timeExit: {
        type: Date,
      },
      price: Number
      


})


// calcula el precio segun la hora de entrada y la de salida

ticketSchema.methods.calculatePrice = function(exitdate) {
  const timeEntry = this.timeEntry;
  console.log(`hora de entrada ${timeEntry} y la hora de salida es ${exitdate} `)
  
  // Calculamos la diferencia en milisegundos
  const diferenciaMilisegundos = exitdate - timeEntry;
  
  // Calculamos la diferencia en horas redondeada
  const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
  
  //obtener precio
  const tariff = this.tariff
  let price = diferenciaHoras * tariff
  if (price == 0) {
    price = tariff
  }
  console.log(price)
  return price;
};



//poner info del ticket, referente a la sailada

ticketSchema.methods.exit = function(){
const info = [];
const exitdate = new Date();
const price = this.calculatePrice(exitdate);
info.push(exitdate,price)
console.log(this._id)
return info

};





const ticket = model('Ticket', ticketSchema );

export default ticket