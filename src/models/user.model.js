import { query } from "../config/db.js";

export const createUser = async ({ name, email, age }) => {
  const { rows } = await query(
    `
    INSERT INTO users (name, email, age)
    VALUES ($1, $2, COALESCE($3, DEFAULT))
    RETURNING id, name, email, age, created_at
    `,
    [name, email, age],
  );

  return rows[0];
};

export const getAllUsers = async () => {
  const { rows } = await query(
    `
    SELECT id, name, email, age, created_at
    FROM users
    ORDER BY created_at DESC
    `,
  );

  return rows;
};

export const getUserById = async (id) => {
  const { rows } = await query(
    `
    SELECT id, name, email, age, created_at
    FROM users
    WHERE id = $1
    `,
    [id],
  );

  return rows[0] || null;
};
