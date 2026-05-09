const db = require("../db");

// Get All Stores
exports.getAllStores = async (req, res) => {
  try {

    const stores = await db.query(
      `
      SELECT
        stores.id,
        stores.name,
        stores.email,
        stores.address,

        COALESCE(
          ROUND(AVG(ratings.rating), 1),
          0
        ) AS average_rating,

        (
          SELECT rating
          FROM ratings
          WHERE ratings.store_id = stores.id
          AND ratings.user_id = $1
        ) AS user_rating

      FROM stores

      LEFT JOIN ratings
      ON stores.id = ratings.store_id

      GROUP BY stores.id

      ORDER BY stores.created_at DESC
      `,
      [req.user.id]
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

// Search Stores
exports.searchStores = async (req, res) => {
  try {

    const { name } = req.query;

    const stores = await db.query(
      `
      SELECT *
      FROM stores
      WHERE LOWER(name)
      LIKE LOWER($1)
      `,
      [`%${name}%`]
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

// Get Store By ID
exports.getStoreById = async (req, res) => {
  try {

    const { id } = req.params;

    const store = await db.query(
      `
      SELECT *
      FROM stores
      WHERE id = $1
      `,
      [id]
    );

    if (store.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    res.status(200).json({
      success: true,
      store: store.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Store Owner Dashboard
exports.ownerDashboard = async (req, res) => {
  try {
    // Find Owner Store
    const storeResult = await db.query(
      `
      SELECT *
      FROM stores
      WHERE owner_id = $1
      `,
      [req.user.id]
    );

    if (storeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    const store = storeResult.rows[0];

    // Average Rating
    const ratingResult = await db.query(
      `
      SELECT
        ROUND(AVG(rating),1)
        AS average_rating
      FROM ratings
      WHERE store_id = $1
      `,
      [store.id]
    );

    // Users Who Rated
    const usersResult = await db.query(
      `
      SELECT
        users.id,
        users.name,
        users.email,
        ratings.rating
      FROM ratings

      INNER JOIN users
      ON ratings.user_id = users.id

      WHERE ratings.store_id = $1

      ORDER BY ratings.created_at DESC
      `,
      [store.id]
    );

    res.status(200).json({
      success: true,

      store,

      average_rating:
        ratingResult.rows[0]
          .average_rating || 0,

      users:
        usersResult.rows,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==================================================
Get All Stores
==================================================
*/
/*/exports.getAllStores = async (req, res) => {
  try {
    const stores = await db.query(
      `
      SELECT
        stores.id,
        stores.name,
        stores.address,
        COALESCE(AVG(ratings.rating),0) AS overall_rating
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

/*
==================================================
Search Stores
==================================================
*
exports.searchStores = async (req, res) => {
  try {
    const { name } = req.query;

    const stores = await db.query(
      `
      SELECT *
      FROM stores
      WHERE LOWER(name)
      LIKE LOWER($1)
      `,
      [`%${name}%`]
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

/*
==================================================
Get Store By ID
==================================================
*
exports.getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await db.query(
      `
      SELECT *
      FROM stores
      WHERE id = $1
      `,
      [id]
    );

    if (store.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    res.status(200).json({
      success: true,
      store: store.rows[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};*/