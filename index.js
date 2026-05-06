import express from 'express';
import dotenv from 'dotenv';

import getPublicUrl from './utils/getPublicUrl.js';

import callbackRoute from './routes/callback.js';
import pushStkRoute from './routes/pushstk.js';


import getAccessToken from './utils/getAccessToken.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/callback', callbackRoute);
app.use('/pushstk', pushStkRoute);

app.get('/',getAccessToken, (req, res) => {
    const url = getPublicUrl();
    console.log("Woiii");
  res.send('Hello, World!');
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});