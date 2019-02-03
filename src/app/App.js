import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../stripe/CheckoutForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="main">
        <StripeProvider apiKey="pk_test_ykmAFdExAYtRqxOEC5dUXccd">
          <div className="example">
            <h1>Operation Pizza</h1>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    );
  }
}

export default App;
