import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

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
    // Submit form logic here
    alert("Registered successfully!");
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6 border-green-500 border">
      <h2 className="text-3xl font-bold text-green-800 text-center">Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <Input
            name="name"
            type="text"
            placeholder="Name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500" : ""}
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
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "border-red-500" : ""}
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

        <div className="relative">
          <Input
            type={visibleConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "border-red-500" : ""}
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-green-700"
            onClick={() => setVisibleConfirm((prev) => !prev)}
          >
            {visibleConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Register
        </Button>
      </form>

      <p className="text-center text-sm text-green-700">
        Already have an account?{" "}
        <Link to="/auth/login" className="underline font-medium">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
