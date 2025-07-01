import { useState } from "react";
import { domain, useCart } from "../../store";
import styles from "./CheckOut.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

export default function CheckOut() {
  const { closeCheckOut, productsInCart, resetCart, closeCart } = useCart();
  const handleClose = (e) => {
    e.stopPropagation();
    closeCheckOut();
  };

  const [customerAmount, setCustomerAmount] = useState("");
  const [remain, setRemain] = useState(-1);

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
  const createNewInvoice = (total) => {
    let user_id = JSON.parse(sessionStorage.getItem("userInfo")).user_id;
    let data = {
      invoice_date: moment().format("YYYY-MM-DD"),
      invoice_total: total,
      pos_user: {
        connect: [user_id],
      },
    };
    axios
      .post(domain + "/api/invoices", {
        data: data,
      })
      .then((res) => {
        let newInvoiceId = res.data.data.documentId;
        createRecords(newInvoiceId);
      });
  };

  const createRecords = (invoiceId) => {
    productsInCart.forEach((el) => {
      let data = {
        product_qty: el.qty,
        invoice: {
          connect: [invoiceId],
        },
        product: {
          connect: [el.documentId],
        },
      };
      axios
        .post(domain + "/api/invoices-details", { data: data })
        .then((res) => {});
    });

    Swal.fire({
      icon: "success",
      title: "Invoice Successfully Saved !",
      timer: 1500,
    }).then(() => {
      closeCheckOut();
      resetCart();
      closeCart();
    });
  };

  const saveInvoice = () => {
    let total = getTotal();
    createNewInvoice(total);
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
          onClick={saveInvoice}
          className="btn btn-primary col-12"
          disabled={remain < 0 ? true : false}
        >
          Save & Print
        </button>
      </div>
    </div>
  );
}
