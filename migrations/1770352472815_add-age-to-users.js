export const up = (pgm) => {
  pgm.addColumn("users", {
    age: {
      type: "integer",
      notNull: true,
      default: 0,
    },
  });
};

export const down = (pgm) => {
  pgm.dropColumn("users", "age");
};
