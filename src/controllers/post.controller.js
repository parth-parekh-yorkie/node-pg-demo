import * as Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  const post = await Post.createPost(req.body);
  res.status(201).json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.getPosts(req.query.cursor);
  res.json(posts);
};
