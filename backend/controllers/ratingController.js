const db = require("../db");

// Submit Rating
exports.submitRating = async (req, res) => {
  try {

    const { store_id, rating } = req.body;

    // Check existing rating
    const existingRating = await db.query(
      `
      SELECT *
      FROM ratings
      WHERE user_id = $1
      AND store_id = $2
      `,
      [req.user.id, store_id]
    );


    // UPDATE EXISTING RATING
    if (existingRating.rows.length > 0) {

      const updatedRating = await db.query(
        `
        UPDATE ratings
        SET rating = $1
        WHERE user_id = $2
        AND store_id = $3
        RETURNING *
        `,
        [rating, req.user.id, store_id]
      );

      return res.status(200).json({
        success: true,
        message: "Rating updated successfully",
        rating: updatedRating.rows[0],
      });
    }

    // INSERT NEW RATING
    const newRating = await db.query(
      `
      INSERT INTO ratings(user_id, store_id, rating)
      VALUES($1, $2, $3)
      RETURNING *
      `,
      [req.user.id, store_id, rating]
    );

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      rating: newRating.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Rating
exports.updateRating = async (req, res) => {
  try {
    const { id } = req.params;

    const { rating } = req.body;

    // Check rating exists
    const existingRating = await db.query(
      `
      SELECT *
      FROM ratings
      WHERE id = $1
      `,
      [id]
    );

    if (existingRating.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    // Update rating
    const updatedRating = await db.query(
      `
      UPDATE ratings
      SET rating = $1
      WHERE id = $2
      RETURNING *
      `,
      [rating, id]
    );

    res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      rating: updatedRating.rows[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Rating
exports.deleteRating = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `
      DELETE FROM ratings
      WHERE id = $1
      `,
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Rating deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};