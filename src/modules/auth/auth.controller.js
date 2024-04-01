import userModel from "../../../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "./auth.validation.js";
import sendEmail from "../../utils/sendEmail.js";

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  

  const user = await userModel.findOne({ email });

  if (user) {
    return res.json("email already exists");
  }

  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  const createUser = await userModel.create({
    userName,
    email,
    password: hashPassword,
  });
  const confirmToken = await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:60*1});
  const refreshToken = await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:60*60*24});



  const html = `
  <h1>Register</h1>
  <h2>hello ${userName}</h2> 
  <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${confirmToken}'>plz confirm your email!</a> 
  <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${refreshToken}'>refresh your token</a> 

  `
  sendEmail(email,'welcome',html)

  return res.status(409).json({ message: "success", createUser });
};

export const signin = async(req,res)=>{
    const {email, password} = req.body;
    
  

    const user = await userModel.findOne({email});
    if(!user){
        return res.json("email not found");
    }
    const checkPassword = await bcrypt.compare(password,user.password);

    if(!checkPassword){
        return res.json("invalid data")
    }
    if(!user.confirmEmail){
      return res.json({message:"plz confirm your email"})
    }
    const token = jwt.sign({id:user._id , role:'User'},process.env.LOGINSTG)

    return res.json({message:"success", token})
 

};

export const confirmEmail = async(req, res) =>{
  const {token} = req.params;

  const decoded = jwt.verify(token, process.env.CONFIRMEMAILTOKEN);
  const user = await userModel.updateOne({email: decoded.email}, {confirmEmail: true});

  if(!user){
    return res.json({message:"invalid token"})
  }
  return res.json({message:"confirm email",user})

}


