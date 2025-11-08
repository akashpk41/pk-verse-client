import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import Loading from "./components/common/Loading";
import useAuthUser from "./hooks/useAuthUser";
import Call from "./pages/Call";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  const { authUser, isLoading } = useAuthUser();
  // console.log(authUser);

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Home />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? <Notifications /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <Onboarding />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
        />
        <Route
          path="/call"
          element={isAuthenticated ? <Call /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />

        {/* testing */}
        {/* <Route path="/onboarding" element={<Onboarding />} /> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
