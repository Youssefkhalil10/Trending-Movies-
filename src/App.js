import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Login from "./Login/Login";
import Movies from "./Movies/Movies";
import Register from "./Register/Register";
import Network from "./Network/Network";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Forgot_Password from "./Forgot_Password/Forgot_Password";
import MoviesDetails from "./MoviesDetails/MoviesDetails";

function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
    }
  }, []);
  function getUserData() {
    let decodedToken = jwtDecode(localStorage.getItem("userToken"));
    setUserData(decodedToken);
  }

  function logout() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("login");
  }

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  function ProtectedRoute({ children }) {
    if (!localStorage.getItem("userToken")) {
      return <Navigate to={"/login"} />;
    } else {
      return children;
    }
  }
  return (
    <div>
      <Navbar userData={userData} logout={logout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                {" "}
                <Home />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<About />} />
          <Route path="/login" element={<Login getUserData={getUserData} />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                {" "}
                <Movies />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />

          <Route
            path="/network"
            element={
              <ProtectedRoute>
                {" "}
                <Network />{" "}
              </ProtectedRoute>
            }
          />

          <Route path="/moviesdetails" element={<MoviesDetails />}>
            <Route path=":id" element={<MoviesDetails />} />
          </Route>

          <Route path="/forgetpassword" element={<Forgot_Password />} />

          <Route path="*" element={<h2>Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
