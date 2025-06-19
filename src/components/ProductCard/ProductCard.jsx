import styles from "./ProductCard.module.css";

export default function ProductCard({ name, price, imgUrl }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 p-3">
      <div
        className={`col-12 shadow rounded border p-3 col-12 d-flex flex-column ${styles.card}`}
      >
        <img src={imgUrl} alt="sacs" />
        <h2>{name}</h2>
        <p>$ {price}</p>
        <button className="btn btn-primary">Add To Cart</button>
      </div>
    </div>
  );
}
