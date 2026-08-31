
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LogInIcon, MailIcon, LockIcon, PackageIcon } from "lucide-react";

const BASE_URL = "https://pern-project.vercel.app";

function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${BASE_URL}/api/auth/login`,
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                        <PackageIcon className="size-8 text-primary" />
                    </div>

                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-base-content/60">
                        Sign in to manage your products
                    </p>
                </div>

                {/* Login Card */}
                <div className="shadow-xl card bg-base-100">
                    <div className="card-body">

                        <h2 className="mb-2 text-xl font-semibold">
                            Sign In
                        </h2>

                        <p className="mb-4 text-sm text-base-content/60">
                            Enter your account details below
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-medium label-text">
                                        Email
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 input input-bordered">
                                    <MailIcon className="size-5 text-base-content/50" />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="grow"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-medium label-text">
                                        Password
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 input input-bordered">
                                    <LockIcon className="size-5 text-base-content/50" />

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="grow"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn btn-primary"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm" />
                                ) : (
                                    <>
                                        <LogInIcon className="size-5" />
                                        Sign In
                                    </>
                                )}
                            </button>

                        </form>

                        {/* Register */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-base-content/60">
                                Don't have an account?
                            </p>

                            <Link
                                to="/register"
                                className="inline-block mt-1 font-medium link link-primary"
                            >
                                Create an account
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}

export default LoginPage;

