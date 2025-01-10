import React from "react";
import "./navbar.css";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="topnav">
      <Link href="/create">Create</Link>
      <Link href="/view">View</Link>
    </div>
  );
};

export default Navbar;
