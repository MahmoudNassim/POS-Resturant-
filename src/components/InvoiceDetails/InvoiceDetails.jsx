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
    <div className="overlay" id={styles.overlay} onClick={closeDetails}>
      <div
        className="animate__animated animate__fadeInRight p-4 d-flex flex-column gap-4"
        id={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="m-0">Invoice Items</h2>
          <button className="btn-close" onClick={closeDetails}></button>
        </div>

        <div className="d-flex flex-column gap-3">
          {details &&
          details.invoices_details &&
          details.invoices_details.length > 0 ? (
            details.invoices_details.map((el) => (
              <div
                key={el.id}
                className={`col-12 rounded-4 border shadow p-3 bg-white d-flex justify-content-between align-items-center ${styles.productCard}`}
              >
                <div className="d-flex flex-column gap-3">
                  <div
                    className={`d-flex align-items-center gap-3 ${styles.productInfo}`}
                  >
                    <img
                      src={domain + el.product.product_img.url}
                      alt={el.product.product_name}
                    />
                    <h2>{el.product.product_name}</h2>
                  </div>
                  <h2 className={styles.totalPrice}>
                    Total Price: $ {el.product_qty * el.product.product_price}
                  </h2>
                </div>
                <div
                  className={`d-flex flex-column gap-2 ${styles.rightSection}`}
                >
                  <h3> {el.product_qty} Pieces</h3>
                  <h3 className={styles.pricePerItem}>
                    $ {el.product.product_price}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted mt-5">
              No products found for this invoice.
            </p>
          )}
        </div>

        {details && (
          <h2 className="my-4 text-center">
            Total: <span className="text-danger">{details?.invoice_total}</span>{" "}
            $
          </h2>
        )}
      </div>
    </div>
  );
}
