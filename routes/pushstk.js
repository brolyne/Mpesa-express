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

const payload = {
  "BusinessShortCode": 174379,
  "Password": password,
  "Timestamp": timestamp,
  "TransactionType": "CustomerPayBillOnline",
  "Amount": "1",
  "PartyA": "254794133937",
  "PartyB": "174379",
  "PhoneNumber": "254794133937",
  "CallBackURL": callbackurl,
  "AccountReference": "Brolyne",
  "TransactionDesc": "Payment for testing"
}

router.post('/', getAccessToken, async (req, res) => {
    console.log("Route reached, public url: ", callbackurl);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.token}`
            },
            body: JSON.stringify(payload)
        });
        //console.log("STK Push Response received: ", response);
        const data = await response.json();
        
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