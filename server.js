require("dotenv").config();

const app = require("express")();
const stripe = require("stripe")(process.env.TEST_STRIPE_SERVER_KEY);

app.use(require("body-parser").text());

app.post("/charge", async (req, res) => {
  try {
    let response = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });
    console.log(response);
    res.json(response);
  } catch (err) {
    res.status(500).end();
  }
});

app.get("*", async (req, res) => {
  res.send("HELLO ");
});

app.listen(9000, () => console.log("Listening on port 9000"));
