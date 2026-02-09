/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

export const up = (pgm) => {
  // 🔑 THIS LINE IS THE KEY
  pgm.noTransaction();

  pgm.createIndex("users", "created_at", {
    concurrently: true,
  });
};

export const down = (pgm) => {
  pgm.noTransaction();

  pgm.dropIndex("users", "created_at", {
    concurrently: true,
  });
};
