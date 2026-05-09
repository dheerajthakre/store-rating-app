const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    // Check existing user
    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const newUser = await db.query(
      `
      INSERT INTO users(name, email, address, password, role)
      VALUES($1, $2, $3, $4, $5)
      RETURNING id, name, email, role
      `,
      [name, email, address, hashedPassword, "USER"]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser.rows[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const userResult = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = userResult.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Password
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Get current user
    const userResult = await db.query(
      "SELECT * FROM users WHERE id = $1",
      [req.user.id]
    );

    const user = userResult.rows[0];

    // Verify old password
    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // Update password
    await db.query(
      `
      UPDATE users
      SET password = $1
      WHERE id = $2
      `,
      [hashedPassword, req.user.id]
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};