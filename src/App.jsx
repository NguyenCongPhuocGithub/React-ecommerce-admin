import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import axiosClient from "./libraries/axiosClient";
import { LOCATIONS } from "./constants";

import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import SupplierPage from "./pages/SupplierPage";
import OrderPage from "./pages/OrderPage";
import EmployeePage from "./pages/EmployeePage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import ProductAdd from "./pages/ProductPage/ProductAdd";

function App() {
  const navigate = useNavigate();

  const token = window.localStorage.getItem("TOKEN");

  useEffect(() => {
    if (token) {
      axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
    } 
    else {
      navigate(LOCATIONS.LOGIN);
    }
  }, [navigate, token]);

  return (
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            {token ? (
              <>
                <Route index element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/add" element={<ProductAdd />}/>
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/suppliers" element={<SupplierPage />} />
                <Route path="/orders" element={<OrderPage />} />
                <Route path="/employees" element={<EmployeePage />} />
                <Route path="*" element={<NoPage />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NoPage />} />
              </>
            )}
          </Route>
        </Routes>
      </ErrorBoundary>
  );
}

export default App;
