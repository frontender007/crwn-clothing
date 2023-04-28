import React from "react";
import { Route, Routes } from "react-router-dom";
import Authorization from './routes/auth/Authorization.component';
import Home from "./routes/home/Home.component";
import Navigation from "./routes/navigation/Navigation.component";
import Shop from "./routes/shop/Shop.component";
import Checkout from "./routes/checkout/Checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authorization/>} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
