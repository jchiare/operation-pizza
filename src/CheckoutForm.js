import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import "./App.css";

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
    const { token } = await this.props.stripe.createToken({ name: "George" });
    const response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      this.setState({ complete: true });
    } else {
      console.log("no ok response \n" + data);
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <form onSubmit={this.submit}>
        <label>
          Card details
          <CardElement {...createOptions} />
        </label>
        <button>Pay</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
