import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CategoryProducts.module.css";
import NavHeader from "../../components/NavHeader/NavHeader";
import { useCategories } from "../../store";
export default function CategoryProducts() {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const { data: categories, resetActiveId, active_cat_id } = useCategories();
  const [categoryInfo, setCategoryInfo] = useState({});

  useEffect(() => {
    let obj = categories.find((el) => {
      return el.documentId == active_cat_id;
    });

    if (obj) {
      setCategoryInfo(obj);
      setCheck(true);
    } else {
      navigate("/error");
    }

    return () => {
      // Will Excute After Component UnMount
      resetActiveId();
    };
  }, []);
  return (
    check && (
      <div className="col-12">
        <NavHeader tabName={categoryInfo.name} />
      </div>
    )
  );
}
