import Puesto from '../models/puestoMd.js'
import User from '../models/userMd.js' // Asegúrate de que la ruta sea correcta

const puestoCtrl = {}


puestoCtrl.getPuestos = async(req,res) => {
    const Puestos = await Puesto.find();
    res.json(Puestos)
}

puestoCtrl.newPuesto = async (req,res)=>{
    const {nPuesto, available} = req.body;
    const newPuesto = new Puesto({
       nPuesto,
       available
    })
    console.log()
    await newPuesto.save();
    res.send("Guardado")

    
}


puestoCtrl.updatePuesto = async (req, res) => {
    try {
      const puesto = await Puesto.findOne({ nPuesto: req.params.nPuesto });
  
      if (!puesto) {
        return res.status(404).send("Puesto no encontrado");
      }
  
      // Cambiar el valor de available en el puesto
      puesto.changeAvalible();
      const puestoUpdated = await puesto.save();
      res.status(200).send(puestoUpdated)
  
    } catch (error) {
      console.error(error);
      res.status(500).send("Error del servidor");
    }
  };
  
puestoCtrl.deletePuesto = async (req,res)=>{
    await Puesto.findOneAndDelete({ nPuesto: req.params.nPuesto })
    res.send("deleted")


}

puestoCtrl.getOnePuesto = async (req, res) => {
    const Puestoget = await Puesto.findOne({nPuesto: req.params.nPuesto})
    res.json(Puestoget)
}



export default puestoCtrl
