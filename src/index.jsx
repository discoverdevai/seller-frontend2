import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Screen } from "./screens/Screen";
import { ProductsPage } from "./screens/ProductsPage";
import { OrdersPage } from "./screens/OrdersPage";
import { InventoryPage } from "./screens/InventoryPage";
import { AnalyticsPage } from "./screens/AnalyticsPage";
import { SettingsPage } from "./screens/SettingsPage";
import { MainProfileScreen } from "./screens/ProfilePage/MainProfileScreen";
import { ProductPage } from "./screens/ProductsPage/ProductPage.";
import {AddProduct} from "./screens/ProductsPage/AddProduct"
import "./i18n";


createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Screen />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<MainProfileScreen />} />
        <Route path="/addProduct" element={<AddProduct />} />


      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
