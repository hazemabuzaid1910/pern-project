import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

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
                "/api/auth/register",
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
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="card bg-base-100 shadow-xl p-8 w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6">
                    Create Account
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered w-full mb-4"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full mb-4"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full mb-4"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Create Account
                </button>

                <p className="text-center mt-4">
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