import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart/Cart";
import Shop from "./Pages/Shop/Shop";
import ComparePopUp from "./Components/ComparePopUp/ComparePopUp";
import Product from "./Pages/Product/Product";
import Checkout from "./Pages/Checkout/Checkout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CardProductDetail from "./Components/CardProductDetail/CardProductDetail";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <CardProductDetail />
      <ComparePopUp />
      <Switch>
        <Route component={Home} path="/" exact/>
        <Route component={Cart} path="/cart" exact/>
        <Route component={Checkout} path="/checkout" exact />
        <Route component={Product} path="/product/:id" exact />
        <Route component={Shop} path="/shop/page/:page" exact/>
        <Route component={Shop} path="/shop" exact/>
        <Route component={Login} path="/login" exact/>
        <Route component={Register} path="/register" exact/>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
