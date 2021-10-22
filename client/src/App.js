import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import FbDropdownMenu from './components/FbDropdownMenu/FbDropdownMenu';
import Sidebar from "./components/Sidebar/";
import StatsPage from "./pages/stats";
import BadgePage from "./pages/badge";
import ManualPage from "./pages/manual";
import Home from "./pages";
import SignIn from "./pages/login";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={SignIn} />
                <div>
                    <Sidebar />

                    <Route path="/dashboard" exact component={Home} />
                    <Route path="/stats" exact component={StatsPage} />
                    <Route path="/badge" exact component={BadgePage} />
                    <Route path="/manual" exact component={ManualPage} />
                </div>
            </Switch>
        </Router>
    );
}

export default App;
