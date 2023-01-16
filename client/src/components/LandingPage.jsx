import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage() {
  return (
    <div>
      <Link to="/home">
        <button className="button"> INGRESAR </button>
      </Link>
    </div>
  )
}