import { useNavigate } from "react-router-dom";
import NavHeader from "../../components/NavHeader/NavHeader";
import { domain, useCategories } from "../../store";
import styles from "./Categories.module.css";

export default function Categories() {
  const { setActiveId, data: appCategories } = useCategories();

  const navigate = useNavigate();
  const openCategory = (documentId) => {
    setActiveId(documentId);
    navigate(documentId);
  };

  return (
    <div className="" id={styles.categoriesPage}>
      <NavHeader tabName={"Categories"} />
      <div className="d-flex flex-wrap col-12 container">
        {appCategories.map((el) => (
          <div
            key={el.documentId}
            className="col-10 col-md-6 col-lg-4 p-2"
            onClick={() => openCategory(el.documentId)}
          >
            <div
              className={
                styles.productCard + " shadow rounded border col-12 p-3"
              }
            >
              <img src={domain + el.category_img.url} alt="" />
              <p>{el.category_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
