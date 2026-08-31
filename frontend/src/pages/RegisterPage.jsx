import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
const BASE_URL = "https://pern-project.vercel.app";

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${BASE_URL}/api/auth/register`,
                formData
            );

            toast.success("Account created successfully");

            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 shadow-xl card bg-base-100"
            >
                <h1 className="mb-6 text-2xl font-bold">
                    Create Account
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full mb-4 input input-bordered"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full mb-4 input input-bordered"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full mb-4 input input-bordered"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="w-full btn btn-primary"
                >
                    Create Account
                </button>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="link link-primary"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;