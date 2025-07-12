import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar"; // adjust path if needed

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white-100">
        <Outlet />
      </main>
    </>
  );
}
