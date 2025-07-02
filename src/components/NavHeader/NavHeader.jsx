import styles from "./NavHeader.module.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCart, useCategories } from "../../store";
import { FaShoppingCart } from "react-icons/fa";

export default function NavHeader({ tabName }) {
  const navigate = useNavigate();
  const { active_cat_id } = useCategories();
  const { openCart, productsInCart } = useCart();

  return (
    <nav className="bg-white">
      <div className="container">
        <header className="d-flex py-3 justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {active_cat_id != 0 && (
              <button
                className={`btn btn-light rounded-circle me-3 ${styles.backBtn}`}
                onClick={() => navigate("/orders")}
                aria-label="Go back"
              >
                <IoIosArrowRoundBack size={22} />
              </button>
            )}

            <div className="d-flex align-items-center">
              <span className="text-muted">Food & Drinks</span>
              <FaAngleRight className="mx-1 text-muted" />
              <h5 className="mb-0 fw-bold">{tabName}</h5>
            </div>
          </div>

          <div className="position-relative ">
            <button
              className="btn btn-light rounded-circle position-relative"
              onClick={openCart}
              aria-label="Shopping cart"
            >
              <FaShoppingCart className={styles.cartIcon} size={18} />

              {productsInCart && (
                <p className="position-absolute  top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {productsInCart.reduce((acc, el) => acc + el.qty, 0)}
                  <span className="visually-hidden">items in cart</span>
                </p>
              )}
            </button>
          </div>
        </header>
      </div>
    </nav>
  );
}
