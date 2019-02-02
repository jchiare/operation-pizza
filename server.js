require("dotenv").config();

const GetPizzaData = require("./src/data/GetData").GetPizzaData;
const app = require("express")();
const stripe = require("stripe")(process.env.TEST_STRIPE_SERVER_KEY);

app.use(require("body-parser").text());

app.post("/charge", async (req, res) => {
  try {
    console.log(req.body);
    let response = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });
    GetPizzaData();
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.get("*", async (req, res) => {
  res.send("HELLO ");
});

app.listen(9000, () => console.log("Listening on port 9000"));
