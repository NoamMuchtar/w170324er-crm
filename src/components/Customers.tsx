import { FunctionComponent, useEffect, useState } from "react";
import { Customer } from "../interfaces/Customer";
import { deleteCustomer, getAllCustomers } from "../services/CustomerService";
import { useNavigate } from "react-router-dom";

interface CustomersProps {}

const Customers: FunctionComponent<CustomersProps> = () => {
  const navigate = useNavigate();
  let [customers, setCustomers] = useState<Customer[]>([]);
  let [customersChanged, setCustomersChanged] = useState<boolean>(false);

  useEffect(() => {
    getAllCustomers()
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => console.log(err));
  }, [customersChanged]);
  return (
    <>
      <h4 className="display-4 text-primary mb-4">
        <i className="fa-solid fa-users"></i> Customers
      </h4>

      <div className="container">
        {customers.length ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="col-2">ID</th>
                <th className="col-2">First Name</th>
                <th className="col-2">Last Name</th>
                <th className="col-2">Email</th>
                <th className="col-2">Phone</th>
                <th className="col-1"></th>
                <th className="col-1"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer: Customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <i
                      className="fa-solid fa-user-pen text-warning pointer"
                      onClick={() => {
                        navigate(`update-customer/${customer.id}`);
                      }}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-user-xmark text-danger pointer"
                      onClick={() => {
                        if (window.confirm("Are you sure?")) {
                          deleteCustomer(customer.id as string)
                            .then(() => {
                              window.alert(
                                `${customer.email} Deleted successfuly`
                              );
                              setCustomersChanged(!customersChanged);
                            })
                            .catch((err) => console.log(err));
                        }
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Sorry, No customers found!</p>
        )}
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/add-customer");
          }}
        >
          Add Customer
        </button>
      </div>
    </>
  );
};

export default Customers;
