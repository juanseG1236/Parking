import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'




const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2, // Mínimo 2 caracteres
    maxlength: 50, // Máximo 50 caracteres
  },
  user: {
    type: String,
    unique: true, // Para garantizar que sea único
    required: true,
    minlength: 2, // Mínimo 2 caracteres
    maxlength: 50, // Máximo 50 caracteres
  },
  password: {
    type: String,
    required: true,
    minlength: 2, // Mínimo 2 caracteres
  },

  role: {
type: String,
enum: ["User" , "Admin"],
default: "User"

  }


})


userSchema.statics.encripted = function (password) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(typeof hashedPassword)
  return hashedPassword

}


userSchema.methods.validatePassword = function (password, hashedPassword) {
  
  const validate =  bcrypt.compareSync(password, hashedPassword)
  return validate
}


userSchema.methods.createToken = function () {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: this._id,
    };

    jwt.sign(payload, 'secretito', { expiresIn: '1d' }, (err, token) => {
      if (err) {
        reject(err);
      }
      token = 'Bearer ' + token;
      resolve(token);
    });
  });
};

userSchema.pre('save', function (next) {
  
  this.name = this.name.toLowerCase();
  this.user = this.user.toLowerCase();

  next();
});


const user = model('User', userSchema);

export default user