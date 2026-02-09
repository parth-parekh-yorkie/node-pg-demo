import { query } from "../config/db.js";

export const createPost = async ({ user_id, title, content, category_ids }) => {
  const { rows } = await query(
    `
      WITH new_post AS (
        INSERT INTO posts (user_id, title, content)
        VALUES ($1, $2, $3)
        RETURNING id
      )
      INSERT INTO post_categories (post_id, category_id)
      SELECT new_post.id, unnest($4::int[])
      FROM new_post
      RETURNING post_id;
      `,
    [user_id, title, content, category_ids],
  );

  return rows[0];
};

export const getPosts = async (cursor) => {
  const { rows } = await query(
    `
      SELECT
        p.id,
        p.title,
        p.created_at,
        u.name AS author,
        COALESCE(
          json_agg(c.name) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS categories
      FROM posts p
      JOIN users u ON u.id = p.user_id
      LEFT JOIN post_categories pc ON pc.post_id = p.id
      LEFT JOIN categories c ON c.id = pc.category_id
      WHERE ($1::timestamp IS NULL OR p.created_at < $1)
      GROUP BY p.id, u.name
      ORDER BY p.created_at DESC
      LIMIT 10;
      `,
    [cursor ?? null],
  );

  return rows;
};

export const getPaginatedPosts = async ({ page, limit }) => {
  const offset = (page - 1) * limit;

  const { rows } = await query(
    `
      SELECT *
      FROM posts
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
      `,
    [limit, offset],
  );

  return rows;
};
