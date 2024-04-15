import mongoose, { Schema, model, Mongoose } from "mongoose";
import { format } from 'date-fns';

const ticketSchema = new Schema({
  timeEntry: {
    type: Date,
    required: true,
    get: formatTime, // Getter para aplicar el formato de fecha
    set: function(time) {
      // Setter para convertir el valor a Date y aplicar formato si es necesario
      return time instanceof Date ? time : new Date(time);
    }
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
        get: formatTime
      },
      price: Number
},{ toJSON: { getters: true, setters: true} });

//format date
//format date
function formatTime(timeEntry){
  // Verificar si timeEntry es una instancia válida de Date
  if (!(timeEntry instanceof Date)) {
    // Si no es una instancia válida de Date, devuelve el valor sin aplicar formato
    return timeEntry;
  }

  // Aplicar el formato deseado
  return format(timeEntry, "MMM d, hh:mm a");
}


// calcula el precio segun la hora de entrada y la de salida
ticketSchema.methods.calculatePrice = function(exitdate) {
  const timeEntry = new Date(this.timeEntry); 
  const exitDate = new Date(exitdate);

  // Establecer el año actual para la hora de entrada y salida
  const currentYear = new Date().getFullYear();
  timeEntry.setFullYear(currentYear);
  exitDate.setFullYear(currentYear);

  console.log(`Hora de entrada: ${timeEntry} y hora de salida: ${exitDate}`);

  // Verificar que exitDate sea posterior a timeEntry
  if (exitDate < timeEntry) {
    console.error("Error: La fecha de salida debe ser posterior a la fecha de entrada");
    return;
  }

  // Calculamos la diferencia en milisegundos
  const diferenciaMilisegundos = exitDate.getTime() - timeEntry.getTime();

  // Calculamos la diferencia en horas redondeada
  const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));

  // Obtener la tarifa por hora del ticket
  const tariff = this.tariff;

  // Calcular el precio
  let price = diferenciaHoras * tariff;

  // Si la diferencia es menor a una hora, se cobra la tarifa mínima
  if (price === 0) {
    price = tariff;
  }

  console.log(`Precio: ${price}`);
  return price;
};

//poner info del ticket, referente a la sailada
ticketSchema.methods.exit = function(){
  const info = [];
  const exitdate = new Date();
  const price = this.calculatePrice(exitdate);
  info.push(exitdate,price)
  console.log(info[1])
  return info
};

const ticket = model('Ticket', ticketSchema );

export default ticket;
