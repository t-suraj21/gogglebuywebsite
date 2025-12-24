import React from "react";
import { useSelector } from "react-redux";
import AdminMenu from "../components/AdminMenu";

export default function AdminMenuWrapper() {
  const user = useSelector((state) => state.auth.user);
  if (!user || user.role !== "admin") return null;
  return <AdminMenu />;
}
