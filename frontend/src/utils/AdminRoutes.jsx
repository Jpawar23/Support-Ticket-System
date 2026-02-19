const AdminRoute = () => {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
