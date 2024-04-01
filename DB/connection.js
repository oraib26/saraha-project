import mongoose from "mongoose";

const connectDB = () => {
  return mongoose
    .connect(`${process.env.DB}`)
    .then((result) => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(`error in DB : ${err}`);
    });
};
export default connectDB;
