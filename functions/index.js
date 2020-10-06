const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HU8VrAt2EmRHLUoaRAnhVRasHHVrOl8UtuIeZutKPmuxv04q2htfJY5n3s0LmnkJvzTIm0VxFMIpdGroKr1GMFJ00i7TV5YtV"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - Api routes
app.get(
  "/",
  (request, (response) => response.setEncoding(200).send("hello world"))
);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("/payment Request Recieved BooM !!! for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntent.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);
