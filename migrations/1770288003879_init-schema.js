/* migrations/1686000000000_init_schema.js */

export const up = (pgm) => {
  // Users table
  pgm.createTable("users", {
    id: "id",
    name: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(100)", notNull: true, unique: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  // Posts table
  pgm.createTable("posts", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users(id)",
      onDelete: "cascade",
    },
    title: { type: "varchar(200)", notNull: true },
    content: { type: "text" },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  // Comments table
  pgm.createTable("comments", {
    id: "id",
    post_id: {
      type: "integer",
      notNull: true,
      references: "posts(id)",
      onDelete: "cascade",
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: "users(id)",
      onDelete: "cascade",
    },
    content: { type: "text", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  // Categories table
  pgm.createTable("categories", {
    id: "id",
    name: { type: "varchar(100)", notNull: true, unique: true },
  });

  // Post-Categories many-to-many
  pgm.createTable(
    "post_categories",
    {
      post_id: {
        type: "integer",
        notNull: true,
        references: "posts(id)",
        onDelete: "cascade",
      },
      category_id: {
        type: "integer",
        notNull: true,
        references: "categories(id)",
        onDelete: "cascade",
      },
    },
    {
      primaryKey: ["post_id", "category_id"],
    },
  );
};

export const down = (pgm) => {
  pgm.dropTable("post_categories");
  pgm.dropTable("categories");
  pgm.dropTable("comments");
  pgm.dropTable("posts");
  pgm.dropTable("users");
};
