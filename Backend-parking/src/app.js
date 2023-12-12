import express from "express";
import { set } from "mongoose";
import cors from "cors";

const app = express();

//Settings
app.set('port', 4000)

//Middleware
const corsOptions = {
  exposedHeaders: ['Authorization'],

  };
  
app.use(cors(corsOptions));
app.use(express.json());


//Routes

app.use('/api/User',(await import('./routes/User.js')).default);
app.use('/api/Vehicles',(await import('./routes/Vehicles.js')).default);
app.use('/api/puesto',(await import('./routes/Puesto.js')).default);
app.use('/api/Ticket',(await import('./routes/Ticket.js')).default);
app.use('/api/Reserve',(await import('./routes/Reserve.js')).default);




export default app;
