import React from "react";
import { Link } from "react-router-dom";

export default function AdminMenu() {
  return (
    <div className="bg-blue-50 border-b border-blue-200 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 items-center overflow-x-auto">
        <span className="font-bold text-blue-700 whitespace-nowrap">Admin Menu:</span>
        <Link to="/admin/dashboard" className="text-blue-700 hover:underline whitespace-nowrap">Dashboard</Link>
        <Link to="/admin/products" className="text-blue-700 hover:underline whitespace-nowrap">Manage Products</Link>
        <Link to="/admin/orders" className="text-blue-700 hover:underline whitespace-nowrap">Manage Orders</Link>
        <Link to="/admin/users" className="text-blue-700 hover:underline whitespace-nowrap">Manage Users</Link>
        <Link to="/admin/edit-home" className="text-blue-700 hover:underline whitespace-nowrap">Edit Home Page</Link>
        <Link to="/admin/edit-links" className="text-blue-700 hover:underline whitespace-nowrap">Edit Link Bar</Link>
        {/* Add more admin links as needed */}
      </div>
    </div>
  );
}
