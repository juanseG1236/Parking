import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Configuración de variables de entorno
dotenv.config();

// Crear instancia de la aplicación Express
const app = express();

// Configuración del puerto
app.set('port', process.env.PORT || 4000);

// Middlewares
const corsOptions = {
  exposedHeaders: ['Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());

// Rutas
import userRoutes from './routes/User.js';
import vehiclesRoutes from './routes/Vehicles.js';
import puestoRoutes from './routes/Puesto.js';
import ticketRoutes from './routes/Ticket.js';
import reserveRoutes from './routes/Reserve.js';

app.use('/api/User', userRoutes);
app.use('/api/Vehicles', vehiclesRoutes);
app.use('/api/puesto', puestoRoutes);
app.use('/api/Ticket', ticketRoutes);
app.use('/api/Reserve', reserveRoutes);

// Conexión a la base de datos
const url = process.env.MONGODB_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión"));

db.once("open", () => {
});

// Exportar la aplicación
export default app;