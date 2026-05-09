const db = require("../db");
const bcrypt = require("bcryptjs");


// Add User
exports.addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } =
      req.body;

    // Check existing email
    const existing = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Insert user
    const result = await db.query(
      `
      INSERT INTO users(name, email, address, password, role)
      VALUES($1, $2, $3, $4, $5)
      RETURNING id, name, email, role
      `,
      [name, email, address, hashedPassword, role]
    );

    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Add Store
exports.addStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } =
      req.body;

    const store = await db.query(
      `
      INSERT INTO stores(name, email, address, owner_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [name, email, address, owner_id]
    );

    res.status(201).json({
      success: true,
      message: "Store added successfully",
      store: store.rows[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Dashboard Stats
exports.dashboard = async (req, res) => {
  try {
    const totalUsers = await db.query(
      "SELECT COUNT(*) FROM users"
    );

    const totalStores = await db.query(
      "SELECT COUNT(*) FROM stores"
    );

    const totalRatings = await db.query(
      "SELECT COUNT(*) FROM ratings"
    );

    res.status(200).json({
      success: true,
      data: {
        totalUsers: totalUsers.rows[0].count,
        totalStores: totalStores.rows[0].count,
        totalRatings: totalRatings.rows[0].count,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await db.query(
      `
      SELECT id, name, email, address, role
      FROM users
      ORDER BY created_at DESC
      `
    );

    res.status(200).json({
      success: true,
      users: users.rows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Stores
exports.getStores = async (req, res) => {
  try {
    const stores = await db.query(
      `
      SELECT
        stores.*,
        COALESCE(AVG(ratings.rating),0) AS average_rating
      FROM stores
      LEFT JOIN ratings
      ON stores.id = ratings.store_id
      GROUP BY stores.id
      `
    );

    res.status(200).json({
      success: true,
      stores: stores.rows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User By ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db.query(
      `
      SELECT id, name, email, address, role
      FROM users
      WHERE id = $1
      `,
      [id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: user.rows[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};