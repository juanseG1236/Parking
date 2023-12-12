    import Vehicle from '../models/vehicleMd.js'
    import User from '../models/userMd.js' // Asegúrate de que la ruta sea correcta
    import jwt from 'jsonwebtoken'
    import userExtractor from '../middleware/userExtractor.js';



    const vehicleCtrl = {}


    vehicleCtrl.getVehicles = async(req,res) => {
        const Vehicles = await Vehicle.find().populate({
          path: 'idVehicle',
          select: 'plate'
        });
        console.log(Vehicles)
        res.json(Vehicles)
    }

    vehicleCtrl.newVehicle = async (req,res)=>{
            try {
              console.log("cretae")
              const { plate, color, type} = req.body;
              // Ahora puedes usar el userId para crear el vehículo o realizar otras acciones
              const newVehicle = new Vehicle({
                plate,
                color,
                type,
                userIdUser : req.user._id // Asigna el userId a la propiedad userIdUser
              });


              await newVehicle.save();
              console.log(newVehicle)

              res.status(200).send("Guardado");
            } catch (error) {
              // Manejo de errores
              console.error(error);
              res.status(500).send("algo esta mal");
            }
        };


    vehicleCtrl.updateVehicle = async (req,res)=>{ 
        const {color, type, userIdUser} = req.body;
        await Vehicle.findOneAndUpdate({plate: req.params.plate},{
            color,
            type,
            userIdUser
        })
        res.send("updated")

    }

    vehicleCtrl.deleteVehicle = async (req,res)=>{
        await Vehicle.findOneAndDelete({ plate: req.params.plate })
        res.send("deleted")


    }

    vehicleCtrl.getOneVehicle = async (req, res) => {
        const Vehicleget = await Vehicle.findOne({ plate: req.params.plate }).populate({
                path: 'userIdUser', // Campo de referencia en el modelo de vehículo
                model: 'User', 
            });
    
        res.json(Vehicleget)
    }

    vehicleCtrl.getOneVehicleUser = async (req, res) => {
      try {
      const Vehicleget = await Vehicle.findOne({ userIdUser: req.user._id})

      res.status(200).json(Vehicleget)
      } catch (error) {
        res.status(404).send("ha ocurrido un error")

      }
      
  }



    export default vehicleCtrl
    