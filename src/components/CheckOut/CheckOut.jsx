import { useEffect, useState } from "react";
import { useCart } from "../../store";
import styles from "./CheckOut.module.css";

export default function CheckOut() {
  const { closeCheckOut, productsInCart } = useCart();
  const handleClose = (e) => {
    e.stopPropagation();
    closeCheckOut();
  };

  const [customerAmount, setCustomerAmount] = useState("");
  const [remain, setRemain] = useState();

  const handleChange = (e) => {
    const value = +e.target.value;
    setCustomerAmount(e.target.value);
    setRemain(value - getTotal());
  };

  const getTotal = () => {
    return productsInCart.reduce(
      (acc, el) => acc + el.qty * el.product_price,
      0
    );
  };
  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white col-10 col-md-6 col-lg-4 p-3 rounded mt-5 shadow animate__animated animate__fadeInDown"
        id={styles.content}
      >
        <p>CheckOut </p>
        <h3>Total is : ${getTotal()}</h3>
        <h4>
          Customer amount :
          {
            <input
              value={customerAmount}
              onChange={handleChange}
              className="form-control"
              type="number"
              placeholder="Enter Amount Here"
            />
          }
        </h4>
        <h4>Remain : {remain}</h4>
        <button
          className="btn btn-primary col-12"
          disabled={remain < 0 ? true : false}
        >
          Save & Print
        </button>
      </div>
    </div>
  );
}
