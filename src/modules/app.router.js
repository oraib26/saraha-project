import connectDB from "../../DB/connection.js";
import AuthRouter from './auth/auth.router.js'
import UserRouter from './user/user.router.js'
import MessageRouter from './message/message.router.js'

 const initApp = (app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth',AuthRouter)
    app.use('/user',UserRouter)
    app.use('/message',MessageRouter)
    app.use('/*',(req,res)=>{
        return res.json({message : "page not found"})
    })

}

export default initApp;