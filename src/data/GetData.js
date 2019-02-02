require("dotenv").config();

const moment = require("moment");
const admin = require("firebase-admin");

const serviceAccount = require(process.env.FIREBASE_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://operation-pizza.firebaseio.com"
});

const db = admin.firestore();
const ordersRef = db.collection("orders");

const GetPizzaData = () => {
  ordersRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

const AddPizzaData = (child, parent, order) => {
  ordersRef
    .add({
      child: {
        grade: child["grade"],
        name: child["name"],
        teacher: child["teacher"]
      },
      order: {
        notes: order["notes"],
        slices: order["slices"],
        type: order["type"]
      },
      parent: {
        email: parent["email"],
        name: parent["name"]
      },
      timestamp: moment().format("MMMM Do YYYY, h:mm:ss a")
    })
    .then(ref => {
      console.log("Added document with ID: ", ref.id);
    });
};

module.exports = { GetPizzaData, AddPizzaData };
