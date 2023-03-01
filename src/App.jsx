import { MenuContainer } from "./components/MenuContainer";
import Navbar from "../src/components/Navbar";
import { Head } from "./components/Head";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { MenuDetail } from "./components/MenuDetail";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "./feature/menu/menuSlice";
import { LogInPage } from "./components/LogInPage";
import { login, logout, selectUser } from "./feature/user/userslice";
import { auth, onAuthStateChanged } from "./config/firebase";
import { RegisterPage } from "./components/RegisterPage";
function App() {
  const { menuItems } = useSelector((store) => store.menu);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [menuItems]);
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

              <MenuContainer />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products/:productId" element={<MenuDetail />} />
        <Route path="/products" element={<MenuContainer />} />
      </Routes>
    </div>
  );
}

export default App;
