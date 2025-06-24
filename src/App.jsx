import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import SideMenue from "./components/SideMenue/SideMenue.jsx";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import { domain, useCart, useCategories } from "./store/index.jsx";
import axios from "axios";
import SideCart from "./components/SideCart/SideCart.jsx";

export default function App() {
  const { setData } = useCategories();

  const [acceptedRoutes, setAcceptedRoutes] = useState([
    "/",
    "/orders",
    "/settings",
    "/bills",
  ]);
  const { cartIndex } = useCart();

  const [path, setPath] = useState();
  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
    console.log(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    axios
      .get(domain + "/api/categories", {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        let cats = res.data.data;
        console.log(cats);
        let routes = cats.map((el) => "/orders/" + el.documentId);
        let newArr = [...acceptedRoutes, ...routes];
        setAcceptedRoutes(newArr);
        setData(cats);
      });
  }, []);

  return (
    <div className="App col-12 d-flex">
      {cartIndex && <SideCart />}

      {acceptedRoutes.includes(path) && <SideMenue />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Categories />} />
        <Route path="/orders/:id" element={<CategoryProducts />} />
        <Route path="/settings" element={<h1>Settings</h1>} />
        <Route path="/bills" element={<h1>Bills</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}
