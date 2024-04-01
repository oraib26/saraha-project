import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    userName :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required:true
    },
    password:{
        type : String,
        required:true
    },
    confirmEmail:{
        type: Boolean,
        default: false
    },
    age:Number,
    gender:{
        type: String,
        enum: ['Male', 'Female']
    }
},
{
 
    timestamps:true,
})

const userModel = model('User', userSchema)

export default userModel;