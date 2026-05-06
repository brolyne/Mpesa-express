# Daraja STK Push Demo

Small Express service for initiating M-Pesa STK Push requests with the Safaricom Daraja sandbox and receiving the asynchronous callback response.

## Tech stack

- Node.js
- Express
- ngrok

## Requirements

- Node.js 18 or newer
- A Safaricom Daraja sandbox account
- An ngrok auth token

## Environment variables

Create a `.env` file in the project root with:

```env
PORT=3000
CONSUMER_KEY=your_daraja_consumer_key
CONSUMER_SECRET=your_daraja_consumer_secret
BUSINESS_SHORTCODE=your_shortcode
PASSKEY=your_daraja_passkey
NGROK_AUTH_TOKEN=your_ngrok_auth_token
```

## Installation

```bash
npm install
```

## Running the app

Development:

```bash
npm run dev
```

Normal run:

```bash
npm run run
```

The server starts on `PORT` or `3000` by default.

## Important implementation notes

- This project is configured for the Safaricom sandbox endpoint, not production.
- The callback URL is generated with ngrok at runtime.
- The current route builds some request values at module load time, including the callback URL and timestamp.

## Scripts

- `npm run dev` - start with nodemon
- `npm run run` - start with Node.js
