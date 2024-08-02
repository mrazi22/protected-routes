import React from "react";
import Login from "./components/login_component/login";
import Signup from "./components/signup_component/signup";
import AdminHome from "./components/adminhome/adminHome";
import UserHome from "./components/userHome/userHome";
import UserDetails from "./components/userDetails/userDetails";
import Navbar from "./components/navbar/navbar";
import ProtectedRoute from "./components/protected/protectedRoutes";
import About from "./components/About/about";
import Events from "./components/eventsOffered/Events";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";


function App() {
    const isLoggedIn = window.localStorage.getItem("loggedIn"); // Check if logged in
  const userType = window.localStorage.getItem("userType");
  return (
    <BrowserRouter>
       <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} />

        <Routes>
          {/* unauthorized route */}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {/* ProtectedRoutes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            {userType != "Admin" ? (
              <>
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<UserDetails />} />
                <Route path="/userHome" element={<UserHome />} />
                <Route path="/events" element={<Events />} />
                <Route path="/admin" element={<AdminHome/>} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/admin" />} />
                <Route path="/userDetails" element={<Navigate to="/" />} />

                <Route path="/admin" element={<AdminHome />} />
              </>
            )}
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



