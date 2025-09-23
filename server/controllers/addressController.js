const Address = require("../models/userInfo");
const User = require("../models/user");

// ✅ Fetch user's address
const getUserAddress = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found." });
    }

    // Always use authenticated user's ID
    const userId = req.user.userId;

    const address = await Address.findOne({ where: { user_id: userId } });

    if (!address) {
      return res.json({ exists: false, address: null });
    }

    res.json({ exists: true, address });
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Create or update user address
const createOrUpdateAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      full_name,
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country,
      phone,
    } = req.body;

    // Check if an address already exists
    const existingAddress = await Address.findOne({
      where: { user_id: userId },
    });

    if (existingAddress) {
      // Update existing address
      await existingAddress.update({
        full_name,
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country,
        phone,
      });
      return res
        .status(200)
        .json({ message: "Address updated", address: existingAddress });
    } else {
      // Create new address
      const newAddress = await Address.create({
        user_id: userId,
        full_name,
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country,
        phone,
      });
      return res
        .status(201)
        .json({ message: "Address created", address: newAddress });
    }
  } catch (error) {
    console.error("Error updating/creating address:", error);
    res.status(500).json({ message: "Error updating/creating address." });
  }
};

module.exports = { getUserAddress, createOrUpdateAddress };
