import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Auth authRoute="login" />} />
            <Route
              exact
              path="/register"
              element={<Auth authRoute="register" />}
            />
            <Route element={<ProtectedRoute />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
