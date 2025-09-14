const Users = require("../models/user");

const getUserProfile = async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.userId, {
            attributes: ["id", "name", "email", "role"],
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "name", "email", "role"],
        });

        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }

        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { getAllUsers, getUserProfile };
