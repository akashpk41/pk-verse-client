import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Gem,
  Globe,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.fullName.length < 3) {
      return toast.error("Name Is To Short🙂");
    }
    if (!formData.fullName.trim())
      return toast.error("Full Name Is Required🙂");
    if (!formData.email.trim()) return toast.error("Email Is Required😎");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid Email Format😒");
    if (!formData.password) return toast.error("Password Is Required😒");
    if (formData.password.length < 6)
      return toast.error("Password Must Be At Least 6 Characters😭");

    setIsSigningUp(true);
    console.log("Signup with:", formData);
    setTimeout(() => setIsSigningUp(false), 2000);
  };

  return (
    <div className="md:min-h-screen mt-10 flex items-center justify-center p-1 sm:p-6 md:p-8 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
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

        {/* SIGNUP FORM - LEFT SIDE */}
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

          <div className="w-full mt-5">
            <div className="space-y-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl text-center md:text-4xl font-bold bg-gradient-to-r from-warning to-secondary bg-clip-text text-transparent">
                  Create an Account
                </h2>
                <p className="text-md text-center md:text-lg mt-3 leading-relaxed">
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent font-bold text-lg">
                    Join thousands of learners
                  </span>
                  <span className="opacity-70"> and embark on your </span>
                  <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent font-bold text-lg">
                    language mastery journey
                  </span>
                  <span className="opacity-70"> today!</span>
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
                    🚀
                  </motion.span>
                </p>
              </motion.div>

              <div className="space-y-4">
                {/* FULLNAME */}
                <motion.div
                  className="form-control w-full"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Full Name
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                      <User className="size-5 text-base-content/50 group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110" />
                    </div>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      className="input input-bordered text-base w-full pl-12 h-14 rounded-xl bg-base-200 border-2 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 hover:border-primary/50"
                      minLength={3}
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />
                  </div>
                </motion.div>

                {/* EMAIL */}
                <motion.div
                  className="form-control w-full"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
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
                      placeholder="example@gmail.com"
                      className="input input-bordered text-base w-full pl-12 h-14 rounded-xl bg-base-200 border-2 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 hover:border-primary/50"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
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
                  transition={{ delay: 0.6 }}
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
                      placeholder="••••••••"
                      className="input input-bordered text-base w-full pl-12 pr-12 h-14 rounded-xl bg-base-200 border-2 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 hover:border-primary/50"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/50 hover:text-primary transition-all duration-200 hover:scale-110"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm mt-2 opacity-70">
                    Password must be at least 6 characters long
                  </p>
                </motion.div>

                {/* TERMS CHECKBOX */}
                <motion.div
                  className="form-control"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      checked={formData.agreeTerms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          agreeTerms: e.target.checked,
                        })
                      }
                      required
                    />
                    <span className="text-xs md:text-sm">
                      I agree to the{" "}
                      <span className="text-primary underline font-semibold cursor-pointer hover:text-primary/80 transition-colors">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary underline font-semibold cursor-pointer hover:text-primary/80 transition-colors">
                        privacy policy
                      </span>
                    </span>
                  </label>
                </motion.div>
              </div>

              {/* SUBMIT BUTTON */}
              <motion.button
                className="btn btn-lg text-xl btn-primary w-full h-16 rounded-xl shadow-xl shadow-primary/40 hover:shadow-2xl hover:shadow-primary/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                onClick={handleSignup}
                disabled={isSigningUp}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSigningUp ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="size-6 animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Create Account</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                )}
              </motion.button>

              {/* LOGIN LINK */}
              <motion.div
                className="text-center mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-lg">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors"
                  >
                    Log in
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
                src="/signup.png"
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
                Connect with language partners worldwide <Globe />
              </h2>
              <p className="opacity-70 text-lg">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
