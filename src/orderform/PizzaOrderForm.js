import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormSchema } from "./helpers/FormValidation";
import "./pizzaorderstyles.css";

const Error = props => {
  return <p className="error">{props.children}</p>;
};

export class PizzaOrderForm extends Component {
  async handleSubmit(values, { setSubmitting }) {
    const response = await fetch("/pizzaorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        values
      })
    });
    const data = await response.json();
    if (response.ok) {
      alert(data); // do something with data
    }
    setSubmitting(false);
    return;
  }

  render() {
    return (
      <Formik
        initialValues={{
          parent_name: "Jay",
          email: "jay@msn.com",
          order_type: "cheese",
          quantity_pizza: 1,
          child_name: "Dean",
          grade: 6,
          teacher: "ms denny"
        }}
        validationSchema={FormSchema}
        onSubmit={this.handleSubmit}
        render={formProps => {
          return (
            <Form>
              <div>
                <h3>Parent's data</h3>
                <Field
                  type="text"
                  name="parent_name"
                  placeholder="Parent's Name"
                />
                <ErrorMessage component={Error} name="parent_name" />
                <Field type="text" name="email" placeholder="Email address" />
                <ErrorMessage component={Error} name="email" />
              </div>
              <div>
                <h3>Pizza Order</h3>
                <Field
                  type="text"
                  name="order_type"
                  placeholder="Type of Pizza"
                />
                <ErrorMessage component={Error} name="order_type" />
                <Field
                  type="number"
                  name="quantity_pizza"
                  placeholder="Input number of slices"
                  min="1"
                  max="40"
                />
                <ErrorMessage component={Error} name="quantity_pizza" />
              </div>
              <div>
                <h3>Child's data</h3>
                <Field
                  type="text"
                  name="child_name"
                  placeholder="Child's Name"
                />
                <ErrorMessage component={Error} name="child_name" />
                <Field
                  type="number"
                  name="grade"
                  placeholder="Input Child's grade"
                  min="1"
                  max="12"
                />
                <ErrorMessage component={Error} name="grade" />
                <Field type="text" name="teacher" placeholder="Teacher name" />
                <ErrorMessage component={Error} name="teacher" />
              </div>

              <button type="submit" disabled={formProps.isSubmitting}>
                Submit Form
              </button>
            </Form>
          );
        }}
      />
    );
  }
}
