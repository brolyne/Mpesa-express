import { Router } from "express";
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.post('/',(req, res)=>{
    res.status(200).send("Callback received");
    console.log("Request received\n");
    console.log("Body: ",req.body?.CallbackMetadata);
})

export default router;