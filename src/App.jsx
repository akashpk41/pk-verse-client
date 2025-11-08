import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import useAuth from "./hooks/useAuth";
import Call from "./pages/Call";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  const authUser = useAuth();
  console.log(authUser);

  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <Notifications /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={authUser ? <Onboarding /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={authUser ? <Chat /> : <Navigate to="/login" />}
        />
        <Route
          path="/call"
          element={authUser ? <Call /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
