import User from "../models/userMd.js";
import { MongoServerError } from 'mongodb';


const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  const user = await User.find();
  res.json(user);
};

userCtrl.newUser = async (req, res) => {
  try {
    const { name, lastname, user, password, role } = req.body;
    const namejoin = name + lastname;
    const passwordHashed = User.encripted(password);
    const newUser = new User({
      name: namejoin,
      user,
      password: passwordHashed,
      role,
    });
    let newUsersave = await newUser.save();
    console.log(newUsersave._id + "hola")
    res.status(200).json({
      message: "Guardado exitosamente",
      objectId: newUsersave._id,
    });
  } catch (error) {
    console.log(error);
  if (error instanceof MongoServerError && error.code === 11000) {

    res.status(500).send("usuario repetido" );

  }else if(error.errors && error.errors.user && error.errors.user.kind === 'minlength') {
    res.status(501).send("el usuario no cumple con las validaciones");

  }else{
    res.status(500).send("Error al crear usuario" );

  }
  }
};

userCtrl.updateUser = async (req, res) => {
  console.log(req.params.id);
  console.log(req);

  const { name, password } = req.body;
  const passwordHashed = User.encripted(password);

  await User.findByIdAndUpdate(req.params.id, { name, password: passwordHashed });

  res.status(200).send("updated");
};

userCtrl.deleteUser = async (req, res) => {
  const { idUser } = req.body;
  console.log(req.params.id)
  await User.findOneAndDelete(req.params.id);
  res.status(200).send("deleted");
};

userCtrl.getOneUser = async (req, res) => {
  const userget = await User.findById(req.user);
  res.json(userget);
};

userCtrl.validateUser = async (req, res) => {
  try {
    const { user, password } = req.body;
    const userget = await User.findOne({ user: user });
    if (!userget) {
      return res.status(404).send("user no existe");
    }
    const validate = userget.validatePassword(password, userget.password);

    if (validate) {
      const token = await userget.createToken();
      res.set("authorization", token);
      console.log("inicio de sesion")
      return res.status(200).json({
        token,
        role: userget.role,
        username: userget.user,
        name: userget.name,
        id: userget._id,
      });
    }
    return res.status(500).send("usuario o contrasena equivocada");
  } catch (error) {
    return res.status(500).send("error del servidor");
  }
};

export default userCtrl;
