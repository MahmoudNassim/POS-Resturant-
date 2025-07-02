import { useEffect, useState } from "react";
import styles from "./Invoices.module.css";
import moment from "moment";
import axios from "axios";
import { domain, useInvoiceDetails } from "../../store";
import InvoiceDetails from "../../components/InvoiceDetails/InvoiceDetails";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const { index, openDetails, setActiveId } = useInvoiceDetails();

  const getInvoices = (date) => {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let user_id = userInfo.user_id;

    if (!date) {
      date = moment().format("YYYY-MM-DD");
    }
    axios
      .get(domain + "/api/invoices", {
        params: {
          populate: "*",
          filters: {
            $and: [
              {
                invoice_date: {
                  $eq: date,
                },
              },
              {
                pos_user: {
                  documentId: {
                    $eq: user_id,
                  },
                },
              },
            ],
          },
        },
      })
      .then((res) => {
        setInvoices(res.data.data);
        console.log(res.data.data);
      });
  };

  useEffect(() => {
    getInvoices(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="d-flex flex-column col-12 p-3" id={styles.invoicesPage}>
      {index && <InvoiceDetails />}
      <h3>Invoices</h3>
      <input
        className="form-control my-3 w-25"
        type="date"
        value={selectedDate}
        max={moment().format("YYYY-MM-DD")}
        onChange={handleDateChange}
      />

      <div className="d-flex flex-wrap gap-3">
        {invoices &&
          invoices.map((el) => (
            <div
              onClick={() => {
                openDetails();
                setActiveId(el.documentId);
              }}
              key={el.id}
              className={`col-12 col-md-6 col-lg-4 d-flex flex-column  rounded-4 border  mb-3 shadow-sm bg-white ${styles.invoiceCard}`}
            >
              <div className="p-4 d-flex align-items-center justify-content-between">
                <div className={styles.left}>
                  <h2>Order #{el.id}</h2>
                  <span>
                    Processed by: <br />
                    <span className="fw-bold text-black fs-5 ">
                      {el.pos_user.user_name}
                    </span>{" "}
                  </span>
                </div>
                <div className={`d-flex flex-column  gap-3 ${styles.right}`}>
                  <span className="bg-primary text-white p-2 rounded-pill">
                    {el.createdAt.slice(11, 16)}
                  </span>
                  <h3>
                    {" "}
                    <span>Total: </span> <br /> {el.invoice_total} $
                  </h3>
                </div>
              </div>
              <hr />
              <p className="text-center fs-3">Click to view details </p>
            </div>
          ))}
      </div>
    </div>
  );
}
