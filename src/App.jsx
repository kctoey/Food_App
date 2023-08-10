import { MenuContainer } from "./components/MenuContainer";
import Navbar from "../src/components/Navbar";
import { Head } from "./components/Head";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuDetail } from "./components/MenuDetail";
import { useDispatch, useSelector } from "react-redux";

import { LogInPage } from "./components/LogInPage";
import { login, logout, selectUser } from "./feature/user/userslice";
import { auth, onAuthStateChanged } from "./config/firebase";
import { RegisterPage } from "./components/RegisterPage";

import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Product from "./components/Product";
import LineBtn from "./components/LineBtn";

function App() {
  const [loading, setLoading] = useState(false);
  // const { menuItems } = useSelector((store) => store.menu);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Head />

              <Products />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/products/:productId" element={<MenuDetail />} /> */}
        {/* <Route path="/products" element={<MenuContainer />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Checkout />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:id" element={<Product />} />

        {/* <Route exact path="/cart" element={<Cart />} /> */}
      </Routes>
      <LineBtn />
    </div>
  );
}

export default App;
