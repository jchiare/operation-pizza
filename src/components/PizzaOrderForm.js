import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../stylesheets/pizzaorderstyles.css";

const FormSchema = Yup.object().shape({
  parent_name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("First name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  order_type: Yup.string().required("Must choose pizza ..silly"),
  quantity_pizza: Yup.number()
    .moreThan(0, "Must have 1 or more slices")
    .required("Number of slices required"),
  grade: Yup.number()
    .moreThan(0, "Grade too low")
    .lessThan(13, "Grade too high"),
  teacher: Yup.string()
    .min(2, "Too short!")
    .required("Must be a teacher name")
});

const Error = props => {
  return <p className="error">{props.children}</p>;
};

export class PizzaOrderForm extends React.Component {
  handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    alert(JSON.stringify(values));
    setSubmitting(false);
    return;
  };

  render() {
    return (
      <Formik
        initialValues={{
          parent_name: "",
          email: "",
          order_type: "",
          quantity_pizza: 0,
          child_name: "",
          grade: 0,
          teacher: ""
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

              <button type="submit">Submit Form</button>
            </Form>
          );
        }}
      />
    );
  }
}
