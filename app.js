const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let app = express();
const cors = require('cors');



mongoose.connect('mongodb+srv://gokulramcse:wKgXMpHf3Sem4IU2@cluster0.vt3z1ap.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Item = require('./item'); // Create a model for MongoDB collection

app.use(bodyParser.json());
app.use((res, req, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');

    next();
});
app.use(cors());


// CRUD Routes
// Create
app.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read All
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read One
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) throw new Error('Item not found');
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Update
app.put('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) throw new Error('Item not found');
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Delete
app.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) throw new Error('Item not found');
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
