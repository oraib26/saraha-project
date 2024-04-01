import jwt from "jsonwebtoken";
import userModel from "../../models/User.model.js";

// const auth = (req, res, next) => {
//   const { token } = req.headers;

//   if (!token) {
//     return res.json("not auth user");
//   }
//   const decode = jwt.verify(token, process.env.LOGINSTG);

//   req.userId = decode.id;
//   next();
// };

// >>بيرر توكين>>

const auth = async(req, res, next) => {
  const { authoraization } = req.headers;
   if(!authoraization){
    return res.json({message: "token is required"})
   }

  if (!authoraization.startsWith(process.env.BEARERTOKEN)) {
    return res.json({ message: "not auth user" });
  }
  const token = authoraization.split(process.env.BEARERTOKEN)[1];
  const decode = jwt.verify(token, process.env.LOGINSTG);
  const authUser = await userModel.findById(decode.id).select('userName')

  req.user = authUser;
  next();
};

export default auth;
