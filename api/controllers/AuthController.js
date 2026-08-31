import * as authService from "../services/AuthService.js";

export const register = async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Name, email and password are required"
        });
    }

    try {
        const newUser = await authService.register(
            name,
            email,
            password
        );

        res.status(201).json({
            status: "success",
            data: newUser[0]
        });

    } catch (error) {
        console.error(error);

        if (error.message === "User already exists") {
            return res.status(409).json({
                status: "error",
                message: error.message
            });
        }

        res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};