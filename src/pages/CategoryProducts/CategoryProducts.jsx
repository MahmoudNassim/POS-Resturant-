import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CategoryProducts.module.css";
import NavHeader from "../../components/NavHeader/NavHeader";
import { domain, useCategories } from "../../store";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";

export default function CategoryProducts() {
  const params = useParams();
  const navigate = useNavigate();
  const [check, setCheck] = useState(true);
  const { resetActiveId } = useCategories();
  const [categoryInfo, setCategoryInfo] = useState({});

  useEffect(() => {
    let documentId = params.id;
    axios
      .get(domain + `/api/categories/${documentId}`, {
        params: {
          populate: {
            products: {
              populate: "*",
            },
          },
        },
      })
      .then((res) => {
        setCategoryInfo(res.data.data);
        setCheck(true);
      })
      .catch(() => {
        navigate("error");
      });

    return () => {
      // Will Excute After Component UnMount
      resetActiveId();
    };
  }, []);
  return (
    check && (
      <div className="flex-grow-1 container">
        <NavHeader tabName={categoryInfo.category_name} />
        <h1 className="ps-4">Products in Cat : {categoryInfo.category_name}</h1>
        <div className="col-12 d-flex flex-wrap">
          {categoryInfo.products &&
            categoryInfo.products.map((el) => {
              return (
                <ProductCard
                  name={el.product_name}
                  price={el.product_price}
                  imgUrl={domain + el.product_img.url}
                  product={el}
                  key={el.documentId}
                />
              );
            })}
          {categoryInfo.products && categoryInfo.products.length == 0 && (
            <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
              <h1>There are no products</h1>
            </div>
          )}
        </div>
      </div>
    )
  );
}
