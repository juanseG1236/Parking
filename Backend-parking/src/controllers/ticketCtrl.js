import puesto from "../models/puestoMd.js";
import Puesto from "../models/puestoMd.js";
import Ticket from "../models/ticketMd.js";
import user from "../models/userMd.js";
import vehicle from "../models/vehicleMd.js";
import puestoCtrl from "./puestoCtrl.js";

const ticketCtrl = {};



ticketCtrl.newTicket = async (req, res) => {
  const { plate, tariff , type , color } = req.body;

  try {
    // Buscar id del vehículo por placa
    let vehicleObj = await vehicle.findOne({ plate: plate });

    if (!vehicleObj) {
      // Si no encuentra el vehículo, créalo
      const newVehicle = new vehicle({ plate , color , type });
      vehicleObj = await newVehicle.save();
      console.log(vehicleObj)
    }
    console.log("paso1")

    // Buscar todos los puestos
    const puestos = await Puesto.find();
console.log("paso 2")
    // Encontrar un puesto disponible (por ejemplo, un puesto que no esté ocupado)
    const availablePuesto = puestos.find((puesto) => puesto.available);
    console.log(availablePuesto)
    if (!availablePuesto) {
      return res.status(400).send("No hay puestos disponibles.");
    }

    const newTicket = new Ticket({
      timeEntry: new Date(),
      idPuesto: availablePuesto._id,
      idVehicle: vehicleObj._id,
      tariff,
    });

    console.log(newTicket)
    // Marcar el puesto como ocupado
    availablePuesto.available = false;
    await availablePuesto.save();

    console.log(availablePuesto)

    await newTicket.save();
    res.status(200).send(newTicket);

  } catch (error) {
    console.log('hubo un error')
    console.log(error)
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};

ticketCtrl.updateTicket = async (req, res) => {
  try {
    console.log("recibido")
    const { idTicket } = req.body;

    console.log(idTicket)
    // Buscar el ticket por su ID
    const ticket = await Ticket.findById(idTicket)
    .populate("idVehicle");

    console.log(ticket + "este es")
    if (!ticket) {
      // Si el ticket no se encuentra, devolver un código de estado 404 (No encontrado)
      console.log("Ticket no encontrado")
      return res.status(500).json({ message: "Ticket no encontrado" });    }
    const infoTicket = await ticket.exit();
    console.log(ticket._id + "   este");

    await Ticket.findOneAndUpdate(
      { _id: idTicket },
      {
        timeExit: infoTicket[0],
        price: infoTicket[1],
      },
      { new: true }
    );

    //cambio de puesto a available
    const puesto = await Puesto.findById(ticket.idPuesto);
    puesto.changeAvalible();
    puesto.save();

    //busueda denueva para hacer el populate
    const ticketUpdated = await Ticket.findOne({
      _id: idTicket    }).populate("idPuesto");

    console.log(ticketUpdated)

    // Devolver la diferencia en horas como respuesta
    res.status(200).json({ ticketUpdated });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

ticketCtrl.deleteTicket = async (req, res) => {
  await Ticket.findOneAndDelete({ idTicket: req.params.idTicket });
  res.send("deleted");
};

ticketCtrl.getOneTicket = async (req, res) => {
  const Ticketget = await Ticket.findOne({ idTicket: req.params.idTicket })
    .populate("idVehicle")
    .populate("idPuesto");

  res.json(Ticketget);
};

ticketCtrl.getOneTicketUser = async (req, res) => {
  try {
    console.log("estamos en ticket");
  console.log(req.user);
  var { _id } = await vehicle.findOne({ userIdUser: req.user });
  console.log(_id);
  const Ticketget = await Ticket.find({ idVehicle: _id });
  console.log(Ticketget);
  res.json(Ticketget);
  } catch (error) {
    res.status(404).send("no hay ningun ticket")

  }
  
};

ticketCtrl.getTickets = async (req, res) => {
  const Tickets = await Ticket.find().populate({
    path: "idVehicle",
    select: "plate",
  });
  res.json(Tickets);
};

ticketCtrl.getOneTicketUserPopulate = async (req, res) => {
  try {
    var { _id } = await vehicle.findOne({ userIdUser: req.user });

  console.log(_id);
  const Ticketget = await Ticket.find({ idVehicle: _id }).populate({
    path: "idVehicle",
    select: "plate",
  });
  console.log(Ticketget);
  res.status(200).json(Ticketget);
  } catch (error) {
    res.status(404).send("no hay ningun ticket")
  }
  
};



export default ticketCtrl;
