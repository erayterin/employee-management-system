import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import View from "./pages/View";

function App() {
  return (
    <div className="App">
      <h2>Spring - React </h2>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/addEmployee" component={AddEmployee} />
      <Route exact path="/editEmployee/:id" component={EditEmployee} />
      <Route exact path="/viewEmployee/:id" component={View} />
      </Switch>
    </div>
  );
}

export default App;
