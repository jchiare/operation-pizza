import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { PizzaOrderForm } from "../orderform/PizzaOrderForm";
import ".././app/App.css";

const createOptions = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#9e2146"
    }
  }
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = { complete: false };
  }

  async submit(ev) {
    ev.preventDefault();
    console.log(ev.target);
    const { token } = await this.props.stripe.createToken({ name: "George" });
    const response = await fetch("/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stripe_token: token.id
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log("response ok!!!" + JSON.stringify(data));
      this.setState({ complete: true });
    } else {
      console.log("no ok response \n" + JSON.stringify(data));
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div>
        <PizzaOrderForm />
        <form onSubmit={this.submit}>
          <label>
            Card details
            <CardElement {...createOptions} />
          </label>
          <button>Pay</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
