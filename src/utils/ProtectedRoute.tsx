import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirect: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirect,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
