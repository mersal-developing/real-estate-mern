/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RouteGuard({ isPrivate }) {
  const { currentUser } = useSelector((state) => state.user);
  if (isPrivate && !currentUser) {
    // Redirect to sign-in if the user is not authenticated and the route is private
    return <Navigate to="/sign-in" />;
  }

  if (!isPrivate && currentUser) {
    // Redirect to profile if the user is authenticated and the route is public (e.g., sign-in or sign-up)
    return <Navigate to="/profile" />;
  }

  return <Outlet />;
}
