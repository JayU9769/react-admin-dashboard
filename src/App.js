import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/admin/index" />
        </Switch>
      </Router>
  );
}

export default App;
