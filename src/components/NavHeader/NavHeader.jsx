import styles from "./NavHeader.module.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../../store";
import { FaShoppingCart } from "react-icons/fa";

export default function NavHeader({ tabName }) {
  const navigate = useNavigate();
  const { active_cat_id } = useCategories();
  return (
    <header className="col-12 d-flex p-4 gap-4 align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-4 col-6">
        {active_cat_id != 0 && (
          <IoIosArrowRoundBack
            className={styles.backBtn}
            onClick={() => {
              navigate("/orders");
            }}
          />
        )}
        <div className="d-flex align-items-center gap-2">
          <Link to={"/orders"} className="nav-link">
            <p className="m-0 fs-4">Food & Drinks</p>
          </Link>
          <FaAngleRight />
          <p className="m-0 fs-4">{tabName}</p>
        </div>
      </div>
      <FaShoppingCart className="col-6 " />
    </header>
  );
}
