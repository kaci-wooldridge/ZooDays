import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Animals from "./Animals";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
                />
            </Route>
            <Route path="animals">
                <Route index element={<Animals />} />
            </Route>


            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
    );
}