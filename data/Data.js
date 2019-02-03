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

/*

Add pizza order data

Return a promise
*/

async function AddPizzaData({
  child_name,
  email,
  grade,
  order_type,
  parent_name,
  quantity_pizza,
  teacher
}) {
  const AddData = ordersRef
    .add({
      child: {
        grade,
        name: child_name,
        teacher
      },
      order: {
        slices: quantity_pizza,
        type: order_type
      },
      parent: {
        email,
        name: parent_name
      },
      timestamp: moment().format("MMMM Do YYYY, h:mm:ss a")
    })
    .then(ref => {
      return ref.id;
    });
  return AddData;
}

module.exports = { GetPizzaData, AddPizzaData };
