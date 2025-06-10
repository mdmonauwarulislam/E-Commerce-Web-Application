import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    // Replace alert with a toast/snackbar in production
    alert("Logged in successfully!");
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-green-500">
      <h2 className="text-3xl font-bold text-green-800 text-center">Login</h2>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <Input
            type={visiblePassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            aria-label="Password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-green-700"
            onClick={() => setVisiblePassword((prev) => !prev)}
          >
            {visiblePassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-green-700">
        Don’t have an account?{" "}
        <Link to="/auth/register" className="underline font-medium">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
