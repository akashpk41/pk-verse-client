import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Eye, EyeOff, Gem, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { login } from "../lib/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };
  console.log(error);

  return (
    <div className="md:min-h-screen mt-10  flex items-center justify-center p-2 sm:p-6 md:p-8 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <motion.div className="border-2 border-primary/50 flex flex-col md:flex-row w-full max-w-6xl mx-auto bg-base-100/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl blur-3xl -z-10"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* LOGIN FORM - LEFT SIDE */}
        <div className="w-full md:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO with 3D Effect */}
          <motion.div
            className="mb-4 flex items-center justify-center md:justify-start gap-3 group cursor-pointer"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Glow effect behind icon */}
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Gem className="size-12 text-primary relative z-10 drop-shadow-2xl filter group-hover:drop-shadow-[0_0_15px_rgba(var(--p),0.8)] transition-all duration-300" />
            </motion.div>

            <motion.span
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-error via-secondary to-accent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              PK Verse
            </motion.span>
          </motion.div>

          {error && (
            <div className="alert justify-center items-center flex alert-error mb-4">
              <span className="" >{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full mt-5">
            <div className="space-y-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl text-center md:text-4xl font-bold bg-gradient-to-r from-warning to-secondary bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-md text-center md:text-lg mt-3 leading-relaxed">
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent font-bold text-lg">
                    Sign in to continue
                  </span>
                  <span className="opacity-70"> your amazing </span>
                  <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent font-bold text-lg">
                    language journey
                  </span>
                  <motion.span
                    className="inline-block ml-1 text-2xl"
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ✨
                  </motion.span>
                </p>
              </motion.div>

              <div className="space-y-4">
                {/* EMAIL */}
                <motion.div
                  className="form-control w-full"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Email
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                      <Mail className="size-5 text-base-content/50 group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110" />
                    </div>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered text-base w-full pl-12 h-14 rounded-xl bg-base-200 border-2 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 hover:border-primary/50"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </motion.div>

                {/* PASSWORD */}
                <motion.div
                  className="form-control w-full"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Password
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                      <Lock className="size-5 text-base-content/50 group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="any password@1971"
                      className="input input-bordered text-base w-full pl-12 pr-12 h-14 rounded-xl bg-base-200 border-2 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 hover:border-primary/50"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center text-base-content/50 hover:text-primary transition-all duration-200 hover:scale-110"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* FORGOT PASSWORD */}
                <motion.div
                  className="text-start"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <a
                    href="#"
                    className="text-md text-primary font-semibold hover:text-primary/80 transition-colors underline underline-offset-4"
                  >
                    Forgot Password?
                  </a>
                </motion.div>
              </div>

              {/* SUBMIT BUTTON */}
              <motion.button
                className="btn btn-lg text-xl btn-primary w-full h-16 rounded-xl shadow-xl shadow-primary/40 hover:shadow-2xl hover:shadow-primary/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                onClick={handleLogin}
                disabled={isPending}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="size-6 animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Log In</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                )}
              </motion.button>

              {/* SIGNUP LINK */}
              <motion.div
                className="text-center mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-lg">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors"
                  >
                    Create one
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Image Section */}
        <motion.div
          className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 items-center justify-center relative overflow-hidden"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Animated background patterns */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />

          <div className="max-w-md p-8 relative z-10">
            {/* Illustration */}
            <motion.div
              className="relative aspect-square max-w-sm mx-auto"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
              <img
                src="/world.png"
                alt="Language connection illustration"
                className="w-full h-full relative z-10 drop-shadow-2xl"
              />
            </motion.div>

            <motion.div
              className="text-center space-y-3 mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome back to your learning space 📚
              </h2>
              <p className="opacity-70 text-lg">
                Continue practicing conversations and connecting with language
                partners from around the world
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
