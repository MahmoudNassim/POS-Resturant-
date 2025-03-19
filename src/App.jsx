import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import SideMenue from "./components/SideMenue/SideMenue.jsx";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import { useCategories } from "./store/index.jsx";

export default function App() {
  // const [categories] = useState([
  //   { name: "Cold Drinks", path: "cold", price: 500 },
  //   { name: "Burgers", path: "burgers", price: 500 },
  //   { name: "Pizza", path: "pizza", price: 500 },
  //   { name: "Wok", path: "wok", price: 500 },
  //   { name: "Desserts", path: "dessert", price: 500 },
  //   { name: "Pasta", path: "pasta", price: 500 },
  // ]);

  const { data: categories } = useCategories();
  let catRoutes = categories.map((el) => {
    return "/orders/" + el.path;
  });
  // let url = window.location.href;
  // let path = url.split("/")[3];
  const [acceptedRoutes] = useState([
    "/",
    "/orders",
    "/settings",
    "/bills",
    ...catRoutes,
  ]);

  //qestion ?????? why not location.pathname
  const [path, setPath] = useState();
  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <div className="App col-12 d-flex">
      {acceptedRoutes.includes(path) && <SideMenue />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Categories />} />
        <Route path="/orders/:catName" element={<CategoryProducts />} />
        <Route path="/settings" element={<h1>Settings</h1>} />
        <Route path="/bills" element={<h1>Bills</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}
