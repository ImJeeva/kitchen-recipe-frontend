const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://romanjeeva22_db_user:9rKpamXN134npwzC@cluster0.chbka5j.mongodb.net/kitchen?retryWrites=true&w=majority&appName=Cluster0";

let cachedDb = null;
let mongoClient = null;

async function getDB() {
  if (cachedDb && mongoClient) {
    try {
      await mongoClient.db().admin().ping();
      return cachedDb;
    } catch (e) {
      cachedDb = null;
      mongoClient = null;
    }
  }
  
  const { MongoClient, ObjectId } = require('mongodb');
  mongoClient = new MongoClient(MONGO_URL);
  await mongoClient.connect();
  cachedDb = mongoClient.db('kitchen');
  console.log('MongoDB connected');
  return cachedDb;
}

app.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const db = await getDB();
    
    const existingUser = await db.collection('signup').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'user already exists' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ message: 'password must be atleast 8 charecters' });
    }
    
    const hash = await bcrypt.hash(password, 10);
    await db.collection('signup').insertOne({ firstname, lastname, email, password: hash });
    return res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err.message);
    return res.status(500).json({ message: err.message });
  }
});

app.post('/userLogin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await getDB();
    
    const user = await db.collection('signup').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'invalid credentials' });
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ id: user._id }, 'my_secret_and_private_key');
      return res.status(200).json({ message: 'login successful', token });
    } else {
      return res.status(401).json({ message: 'invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: err.message });
  }
});

app.get('/allrecipe', async (req, res) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    jwt.verify(token, 'my_secret_and_private_key');
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  try {
    const db = await getDB();
    const result = await db.collection('recipe').find({}).toArray();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    const db = await getDB();
    const recipe = await db.collection('recipe').findOne({ _id: new ObjectId(req.params.id) });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/cuisines/data', async (req, res) => {
  try {
    const cuisines = req.query.cuisines || req.query.cuisine;
    const db = await getDB();
    const result = await db.collection('recipe').find({ cuisines }).toArray();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/ingredients/data', async (req, res) => {
  try {
    const { ingredient, main_content } = req.query;
    const db = await getDB();
    let result;
    if (main_content) {
      result = await db.collection('recipe').find({ 
        main_content: { $regex: main_content, $options: 'i' } 
      }).toArray();
    } else {
      result = await db.collection('recipe').find({ 
        ingredients: { $regex: ingredient, $options: 'i' } 
      }).toArray();
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/meals/data', async (req, res) => {
  try {
    const { meals } = req.query;
    const db = await getDB();
    const result = await db.collection('recipe').find({ meals }).toArray();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/quick/data', async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('recipe').find({
      cookingtime: { $in: ['10mins', '15mins', '20mins', '25mins', '30mins', '15MINS', '20MINS', '25MINS', '30MINS', '45mins', '45MINS'] }
    }).toArray();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/rated/data', async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('recipe').find({ rating: '⭐⭐⭐⭐⭐' }).toArray();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = app;