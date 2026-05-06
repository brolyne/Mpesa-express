import dotenv from 'dotenv';

dotenv.config();

export const getAccessToken = async (req, res, next) => {
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  try {
    const res = await fetch(`https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`,{
        headers:{
            'Authorization':`Basic ${auth}`
        }
    });
    const data = await res.json();
    console.log("Access Token in function: ",data.access_token);
    req.token=data.access_token;
  } catch (error) {
    console.log("Error: ",error)
  }
  next();

};

export default getAccessToken;