import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
            const response = await axios.post(
                "/api/auth/login",
                formData
            );

            const { token } = response.data.data;

            localStorage.setItem("token", token);

            toast.success("Login successful");

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
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
                    Login
                </h1>

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
                    Login
                </button>

                <p className="mt-4 text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="link link-primary"
                    >
                        Create account
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;