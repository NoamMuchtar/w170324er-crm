import { FunctionComponent, useEffect, useState } from "react";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Customer } from "../interfaces/Customer";
import { getCustomerById, updateCustomer } from "../services/CustomerService";

interface UpdateCustomerProps {}

const UpdateCustomer: FunctionComponent<UpdateCustomerProps> = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  let [customer, setCustomer] = useState<Customer>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    getCustomerById(id as string)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
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
    enableReinitialize: true,
    onSubmit: (values) => {
      updateCustomer(id as string, values as Customer)
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <h4 className="display-4 text-warning mb-4">
        <i className="fa-solid fa-user-pen"></i> Update {customer.email}
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
                  value={formik.values.firstName}
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
                  value={formik.values.lastName}
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
              value={formik.values.email}
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
              value={formik.values.phone}
            />
            <label htmlFor="phone">Phone</label>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-warning"
            disabled={!formik.isValid || !formik.dirty}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCustomer;
