import messageModel from '../../../models/Message.model.js'
import userModel from '../../../models/User.model.js';

export const getMessages =async(req,res)=>{

    const messageList = await messageModel.find({receiverId:req.user._id});

    return res.json({message:"success",messageList})
}
export const sendMessage = async(req,res)=>{

    const {receiverId} = req.params;
    const {message} = req.body;

    const recever = await userModel.findById(receiverId);

    if(!recever){
        return res.status(404).json({message:"invalid recever"})
    }

    const createMessage = await messageModel.create({content:message,receiverId})

    return res.status(201).json({message:"success",createMessage})


}
