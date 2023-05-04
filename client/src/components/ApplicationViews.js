import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ActivitiesPage from "./ActivitiesPage";
import AnimalsPage from "./AnimalsPage";
import Schedules from "./Schedules";
import ScheduleDetails from "./ScheduleDetails";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
                />
            </Route>
            <Route path="schedules">
                <Route index element={<Schedules />} />
                <Route path=":id">
                    <Route index element={<ScheduleDetails />} />
                </Route>
            </Route>
            <Route path="animals">
                <Route index element={<AnimalsPage />} />
            </Route>
            <Route path="activities">
                <Route index element={<ActivitiesPage />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
    );
}