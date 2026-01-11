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
import { SignIn } from "./screens/SignIn/SignIn";
import { Provider } from "react-redux";
import store from "./Store/Store";
import { HeroUIProvider } from "@heroui/react";
import{Register} from "./screens/Register/Register"
import { Toaster } from "react-hot-toast"; // <-- import Toaster
import { PrivateRoute } from "./Api/PrivateRoute"; // path where you put it



import "./i18n";


// createRoot(document.getElementById("app")).render(
//   <StrictMode>
//     <Provider store={store}>
      
//     <BrowserRouter>
//      <Toaster
//           position="top-right"
//           reverseOrder={false}
//           toastOptions={{
//             duration: 3000, // auto-close after 3s
//             style: { fontSize: "14px", fontWeight: "500" },
//           }}
//         />
//       <Routes>
//         <Route path="/" element={<SignIn />} />
//         <Route path="/home" element={<Screen />} />
//         <Route path="/products" element={<ProductPage />} />
//         <Route path="/orders" element={<OrdersPage />} />
//         <Route path="/inventory" element={<InventoryPage />} />
//         <Route path="/analytics" element={<AnalyticsPage />} />
//         <Route path="/settings" element={<SettingsPage />} />
//         <Route path="/profile" element={<MainProfileScreen />} />
//         <Route path="/addProduct" element={<AddProduct />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/register" element={<Register />} />


//       </Routes>
//     </BrowserRouter>
    
//     </Provider>
//   </StrictMode>,
// );


createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000, 
            style: { fontSize: "14px", fontWeight: "500" },
          }}
        />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Screen />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <ProductPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrdersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <InventoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <AnalyticsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <MainProfileScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/addProduct"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);