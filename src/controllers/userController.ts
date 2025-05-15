import { Request, Response } from 'express';
import { getDb } from '../db';
import { ObjectId } from 'mongodb';
import axios from 'axios';

// Interfaces for Geo, Address, Company
interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Comment interface with postId
interface CommentResponse {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// Post interface with userId and comments array
interface PostResponse {
  id: number;
  userId: number;
  title: string;
  body: string;
  comments?: CommentResponse[];
}

// User interface with nested posts
interface UserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  posts?: PostResponse[];
}

// GET /users - get all users from DB
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const usersCollection = db.collection<UserResponse>('users');

    const users = await usersCollection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// GET /load - fetch users, posts, comments from external API and save to DB
export const loadData = async (req: Request, res: Response) => {
  try {
    const [usersRes, postsRes, commentsRes] = await Promise.all([
      axios.get<UserResponse[]>('https://jsonplaceholder.typicode.com/users?_limit=10'),
      axios.get<PostResponse[]>('https://jsonplaceholder.typicode.com/posts'),
      axios.get<CommentResponse[]>('https://jsonplaceholder.typicode.com/comments')
    ]);

    const users = usersRes.data;
    const posts = postsRes.data;
    const comments = commentsRes.data;

    const db = getDb();
    const usersCollection = db.collection('users');

    // Clear old data
    await usersCollection.deleteMany({});

    // Build users with nested posts and comments
    const usersWithPosts = users.map(user => {
      const userPosts = posts
        .filter(post => post.userId === user.id)
        .map(post => ({
          ...post,
          comments: comments.filter(comment => comment.postId === post.id),
        }));

      return {
        ...user,
        posts: userPosts,
      };
    });

    // Insert into DB
    await usersCollection.insertMany(usersWithPosts);

    res.status(200).json({ message: 'Data loaded successfully' });
  } catch (error) {
    console.error('Load data error:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
};

// DELETE /users - delete all users
export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const usersCollection = db.collection('users');

    const result = await usersCollection.deleteMany({});
    res.status(200).json({ message: `${result.deletedCount} user(s) deleted` });
  } catch (error) {
    console.error('Delete all users error:', error);
    res.status(500).json({ error: 'Failed to delete users' });
  }
};

// DELETE /users/:userId - delete user by MongoDB _id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId || !ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const db = getDb();
    const usersCollection = db.collection('users');

    const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// GET /users/:userId - get user by MongoDB _id
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId || !ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const db = getDb();
    const usersCollection = db.collection<UserResponse>('users');

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// PUT /users - add a new user
export const addUser = async (req: Request, res: Response) => {
  try {
    const user: UserResponse = req.body;

    // Basic required fields validation
    if (!user || !user.id || !user.name || !user.username || !user.email) {
      return res.status(400).json({ error: 'Missing required user fields' });
    }

    const db = getDb();
    const usersCollection = db.collection<UserResponse>('users');

    // Check if user with same id or email already exists
    const existingUser = await usersCollection.findOne({
      $or: [{ id: user.id }, { email: user.email }],
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const result = await usersCollection.insertOne(user);

    res.status(201).json({ ...user, _id: result.insertedId });
  } catch (error) {
    console.error('Add user error:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};
