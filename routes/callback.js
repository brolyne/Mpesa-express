import { Router } from "express";
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.post('/',(req, res)=>{
    res.status(200).send("Callback received");
    console.log("Request received\n");
    const response = req.body?.Body?.stkCallback;
    console.log("Body: ",req.body?.Body?.stkCallback);
    console.log("Response: ",JSON.stringify(response));
    if(response.ResultCode=="0"){ 
        // Process the callback response
        console.log("Transaction successful");
    }
    else if(response.ResultCode=="1032"){
        console.log("User cancelled the transaction");
    }
    else if(response.ResultCode=="1037"){
        console.log("User cannot be reached");
    }
    else {
        console.log("Transaction failed with code: ",response.ResultCode);
    }
})

export default router;