import express from "express";
import { set } from "mongoose";
import cors from "cors";
import mongoose from "mongoose"

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

////database


const options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: "myReplicaSetName" },
  user: "juanse",
  pass: "sebastian01",
};

const url =
  "mongodb+srv://juanse:sebastian01@cluster0.cewkanx.mongodb.net/Parking?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexion"));

db.once("open", () => {
  console.log("Conexion exitosa");
});


export default app;
