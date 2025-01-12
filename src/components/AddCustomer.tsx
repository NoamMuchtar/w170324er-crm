import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { addCustomer } from "../services/CustomerService";
import { Customer } from "../interfaces/Customer";
import { useNavigate } from "react-router-dom";

interface AddCustomerProps {}

const AddCustomer: FunctionComponent<AddCustomerProps> = () => {
  const navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required("First name is required filed")
        .min(2, "First must contain 2 charecters at least"),
      lastName: yup.string().required().min(2),
      email: yup.string().email().required(),
      phone: yup
        .string()
        .required()
        .matches(/^(\+972|0)(5[0-9])-?\d{7}$/),
    }),
    onSubmit: (values) => {
      addCustomer(values as Customer);
      navigate("/");
    },
  });
  return (
    <>
      <h4 className="display-4 text-success mb-4">
        <i className="fa-solid fa-user-plus"></i> Add Customer
      </h4>

      <div className="container w-50">
        <form onSubmit={formik.handleSubmit}>
          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Jhon"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="firstName">First Name</label>
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-danger">{formik.errors.firstName}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Doe"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="lastName">Last Name</label>
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-danger">{formik.errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email@example.co.il"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="email">Email</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="phone">Phone</label>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-success"
            disabled={!formik.isValid || !formik.dirty}
          >
            + Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
