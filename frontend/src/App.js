import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./views/HomePage/Home";
import LoginPage from "./views/LoginPage/LoginPage";
import { ContextProvider } from "./context/ContextProvider";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem("users") !== undefined &&
      localStorage.getItem("users") !== null
  );
  const handleLogout = () => {
    localStorage.removeItem("users");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        <ContextProvider>
          <Layout logout={handleLogout} isLoggedIn={isLoggedIn}>
            <Routes>
              <Route path="/" element={isLoggedIn ? <Home /> : <LoginPage />} />
              {isLoggedIn ? null : (
                <Route path="/login" element={<Navigate to="/" />} />
              )}
            </Routes>
          </Layout>
        </ContextProvider>
      </Router>
    </div>
  );
}

export default App;
