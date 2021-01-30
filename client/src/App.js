import {
  BrowserRouter as Router
} from "react-router-dom";
import './App.css';
import GuestRoute from "./components/routes/Guest";
import AuthRoute from "./components/routes/Auth";
import Dashboard from "./components/Dashboard/index";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import History from "./components/History";

function App() {
  return (
    <Router>
        <GuestRoute path="/login" component={Login}/>
        <GuestRoute path="/register" component={Register}/>
        <AuthRoute path="/" exact component={Dashboard}/>
        <AuthRoute path="/history" component={History}/>
    </Router>
  );
}

export default App;
