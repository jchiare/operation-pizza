require("dotenv").config();

const GetPizzaData = require("./data/Data").GetPizzaData;
const AddPizzaData = require("./data/Data").AddPizzaData;
const app = require("express")();
const stripe = require("stripe")(process.env.TEST_STRIPE_SERVER_KEY);

app.use(require("body-parser").json());

app.post("/charge", async (req, res) => {
  try {
    const response = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body.stripe_token
    });
    GetPizzaData();
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

app.post("/pizzaorder", async (req, res) => {
  try {
    const response = await AddPizzaData(req.body.values);
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

app.get("*", async (req, res) => {
  res.send("HELLO ");
});

app.listen(9000, () => console.log("Listening on port 9000"));
