const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const router = express.Router();

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

router.post('/signup', async (req, res) => {
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

router.post('/userLogin', async (req, res) => {
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

router.get('/allrecipe', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.get('/cuisines/data', async (req, res) => {
  try {
    const cuisines = req.query.cuisines || req.query.cuisine;
    const db = await getDB();
    const result = await db.collection('recipe').find({ cuisines }).toArray();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/test', (req, res) => res.json({ ok: true, version: 2 }));

router.get('/ingredients/data', async (req, res) => {
  try {
    const { ingredient, main_content } = req.query;
    const db = await getDB();
    let result;
    if (main_content) {
      result = await db.collection('recipe').find({ main_content }).toArray();
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

router.get('/meals/data', async (req, res) => {
  try {
    const { meals } = req.query;
    const db = await getDB();
    const result = await db.collection('recipe').find({ meals }).toArray();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/quick/data', async (req, res) => {
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

router.get('/rated/data', async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('recipe').find({ rating: '⭐⭐⭐⭐⭐' }).toArray();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/highservings/data', async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('recipe').find({ servings: { $gte: 5 } }).toArray();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/lowservings/data', async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('recipe').find({ servings: { $lte: 2 } }).toArray();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/addrecipe', async (req, res) => {
  try {
    const db = await getDB();
    const recipes = Array.isArray(req.body) ? req.body : [req.body];
    const result = await db.collection('recipe').insertMany(recipes);
    return res.status(200).json({ message: 'Recipe added', inserted: result.insertedCount });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;
    const db = await getDB();
    const user = await db.collection('signup').findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 'Email not found' });
    }
    return res.status(200).json({ status: 'Email sent (demo mode)' });
  } catch (err) {
    return res.status(500).json({ status: err.message });
  }
});

router.post('/reset/:id/:token', async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const db = await getDB();
    const { ObjectId } = require('mongodb');
    await db.collection('signup').updateOne(
      { _id: new ObjectId(id) },
      { $set: { password: hash } }
    );
    return res.status(200).json({ status: 'Password reset successful' });
  } catch (err) {
    return res.status(500).json({ status: err.message });
  }
});

app.use('/api', router);

module.exports = app;
