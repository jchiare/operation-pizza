require("dotenv").config();

const app = require("express")();
const stripe = require("stripe")(process.env.TEST_STRIPE_SERVER_KEY);

const admin = require("firebase-admin");

const serviceAccount = require(process.env.FIREBASE_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-6356d.firebaseio.com"
});

const db = admin.firestore();

app.use(require("body-parser").text());

app.post("/charge", async (req, res) => {
  try {
    let response = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });
    const data = db.collection("pizzas").doc("pizza");
    data.get().then(elem => {
      const data1 = elem.data();
      console.log(data1);
    });
    res.json(response);
  } catch (err) {
    res.status(500).end();
  }
});

app.get("*", async (req, res) => {
  res.send("HELLO ");
});

app.listen(9000, () => console.log("Listening on port 9000"));
