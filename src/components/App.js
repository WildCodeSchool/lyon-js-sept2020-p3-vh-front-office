import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import AboutMorgane from "./About/AboutMorgane";
import AboutAnimators from "./About/AboutAnimators";
import Contact from "./Contact/Contact";
import Faq from "./Contact/Faq";
import Events from "./Events/Events";
import EventDetails from "./Events/Eventdetails";
import Products from "./Products/Products";
import Reviews from "./Reviews/Reviews";
import Login from "./LogIns/Login";
import Register from "./LogIns/Register";
import Sponsors from "./Sponsors/Sponsors";
import Basket from "./Basket/Basket";
import Footer from "./Home/Footer";
import NavBar from "./Home/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/events/:id" component={EventDetails} />
          <Route exact path="/aboutme" component={AboutMorgane} />
          <Route exact path="/animators" component={AboutAnimators} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/reviews" component={Reviews} />
          <Route exact path="/basket" component={Basket} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/sponsors" component={Sponsors} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
