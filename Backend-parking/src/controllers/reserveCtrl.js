import reserve from '../models/reserveMd.js';
import Reserve from '../models/reserveMd.js'
import vehicle from '../models/vehicleMd.js';



const reserveCtrl = {}




reserveCtrl.newReserve = async (req,res)=>{
  try {
    var {date, vehiclePlate} = req.body;
    const newReserve = new Reserve({
        date,
        vehiclePlate
        })
    console.log(newReserve)
    let newsave = await newReserve.save();
    res.status(200).json({
      message: "Guardado exitosamente",
      objectId: newsave._id,
    });
  } catch (error) {
    res.status(500).send("algo esta mal")
  }  
 
    
}


reserveCtrl.updateReserve = async (req,res)=>{ 
    const { date, vehiclePlate} = req.body;
    await Reserve.findOneAndUpdate({idReserve: req.params.plate},{
        date,
        vehiclePlate
    })
    res.send("updated")

}

reserveCtrl.deleteReserve = async (req,res)=>{
    await Reserve.findOneAndDelete({ idReserve: req.params.plate })
    res.send("deleted")


}

reserveCtrl.getOneReserve = async (req, res) => {
    try {
      const reserve = await Reserve.findOne({ idReserve: req.params.idReserve }).populate('vehiclePlate');
      res.json(reserve);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al buscar la reserva' });
    }
  }

  reserveCtrl.getReserves = async(req,res) => {
    const Reserves = await Reserve.find().populate({
        path: 'vehiclePlate',
        select: 'plate'
      });
      console.log(Reserves)
    res.json(Reserves)
}


  reserveCtrl.getOneReserveUser = async (req, res) => {
    try {
          
    var {_id} = await vehicle.findOne({ userIdUser: req.user})
    const Vehicleget = await Reserve.find({ vehiclePlate: _id })
    res.json(Vehicleget)
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar la reserva' });

    }

}




export default reserveCtrl