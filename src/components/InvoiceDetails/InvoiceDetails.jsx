import styles from "./InvoiceDetails.module.css";
import { domain, useInvoiceDetails } from "../../store";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InvoiceDetails() {
  const { closeDetails, activeInvoiceId } = useInvoiceDetails();
  const [details, setDetails] = useState([]);
  useEffect(() => {
    if (activeInvoiceId) {
      axios
        .get(domain + `/api/invoices/${activeInvoiceId}`, {
          params: {
            populate: {
              invoices_details: {
                populate: {
                  product: {
                    populate: "*",
                  },
                },
              },
            },
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setDetails(res.data.data);
        });
    }
  }, []);

  return (
    <div className="overlay " id={styles.overlay} onClick={closeDetails}>
      <div
        className="animate__animated animate__fadeInRight p-3 d-flex flex-column align-items-center "
        id={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        {details &&
          details?.invoices_details?.map((el) => (
            <div
              key={el.documentId}
              className="col-12  rounded border shadow p-3 bg-white d-flex align-items-center mb-3 justify-content-between"
            >
              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-3">
                  <img width={100} src={domain + el.product.product_img.url} />
                  <h2>{el.product.product_name}</h2>
                </div>
                <h2>
                  Total Price : $ {el.product_qty * el.product.product_price}
                </h2>
              </div>
              <div className="d-flex flex-column gap-2">
                <h3> {el.product_qty} Pieces</h3>
                <h3>$ {el.product.product_price}</h3>
              </div>
            </div>
          ))}
        <h2 className="my-4">Total : {details && details?.invoice_total} $</h2>
      </div>
    </div>
  );
}
