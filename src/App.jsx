import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart/Cart";
import Shop from "./Pages/Shop/Shop";
import ComparePopUp from "./Components/ComparePopUp/ComparePopUp";
import Product from "./Pages/Product/Product";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ComparePopUp />
      <Switch>
        <Route component={Home} path="/" exact/>
        <Route component={Cart} path="/cart" exact/>
        <Route component={Product} path="/product/:id" exact />
        <Route component={Shop} path="/shop/page/:page" exact/>
        <Route component={Shop} path="/shop" exact/>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
