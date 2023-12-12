import mongoose from "mongoose"

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
