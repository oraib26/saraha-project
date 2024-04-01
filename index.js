import express from 'express'
import 'dotenv/config'
import initApp from './src/modules/app.router.js';

const app = express();
const PORT = process.env.PORT;

initApp(app, express)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})