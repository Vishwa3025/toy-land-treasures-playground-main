const User = require("../models/user");
const bcrypt = require("bcrypt");

// Update user profile (name,  password)
const updateUserAccount = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, currentPassword, newPassword } = req.body;

        // Find the user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update name if provided
        if (name) {
            user.name = name || user.name;
            await user.save();
            return res.status(200).json({ message: "Profile updated successfully", user });
        }

        // Update password if both current and new password are provided
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect current password" });
            }

            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();
            return res.json({ message: "Password changed successfully" });
        }

        res.status(400).json({ message: "No valid fields provided for update" });

    } catch (error) {
        console.error("Error updating user account:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { updateUserAccount };
