import { Router } from "express";
import dotenv from 'dotenv';

import getTimeStamp from "../utils/getTimeStamp.js";
import getAccessToken from "../utils/getAccessToken.js";
import getPublicUrl from "../utils/getPublicUrl.js";

dotenv.config();
const router = Router();

const timestamp = getTimeStamp();

const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
const callbackurl = await getPublicUrl() + "/callback";
console.log("Callback URL: ", callbackurl);
const password = Buffer.from(`${process.env.BUSINESS_SHORTCODE}${process.env.PASSKEY}${timestamp}`).toString('base64');

let payload = {
  "BusinessShortCode": `${process.env.BUSINESS_SHORTCODE}`,
  "Password": password,
  "Timestamp": timestamp,
  "TransactionType": "CustomerPayBillOnline",
  "Amount": "1",
  "PartyA": "",
  "PartyB": `${process.env.BUSINESS_SHORTCODE}`,
  "PhoneNumber": "",
  "CallBackURL": callbackurl,
  "AccountReference": "Brolyne",
  "TransactionDesc": "Payment for testing"
}


router.post('/', getAccessToken, async (req, res) => {
    let {phone_number, amount} = req.body;
    if(!phone_number || !amount){
        return res.status(400).json({ error: 'Phone number and amount are required' });
    }
    if(phone_number.startsWith("0")){
        phone_number = "254" + phone_number.substring(1);
        payload.PartyA = phone_number;
        payload.PhoneNumber = phone_number;
    }
    
    try {
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.token}`
            },
            body: JSON.stringify(payload)
        });
        const data = await response.text();
        console.log("STK Push Response: ", data);
        return res.status(200).json({ message: 'STK Push initiated successfully', data });
        
        if(data.ResponseCode=="0"){
            console.log("STK sent succesfuly");
            res.status(200).json({ message: 'STK Push initiated successfully', data });
        } else {
            res.status(400).json({ error: 'Failed to initiate STK Push' });
        }
    } catch (error) {
        console.error('Error initiating STK Push:', error);
        res.status(500).json({ error: 'Failed to initiate STK Push' });
    }
});

router.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default router;