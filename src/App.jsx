import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import SideMenue from "./components/SideMenue/SideMenue.jsx";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import { domain, useCart, useCategories } from "./store/index.jsx";
import axios from "axios";
import SideCart from "./components/SideCart/SideCart.jsx";
import Invoices from "./pages/Invoices/Invoices.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import SettingsPage from "./pages/Settings/SettingsPage.jsx";

export default function App() {
  const { setData } = useCategories();

  const [acceptedRoutes, setAcceptedRoutes] = useState([
    "/",
    "/orders",
    "/settings",
    "/invoices",
  ]);
  const { cartIndex } = useCart();

  const [path, setPath] = useState();
  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
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
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}
