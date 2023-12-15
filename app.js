// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const app = express();
// const cors = require('cors');

// app.use(bodyParser.json());


// app.use(cors())


// mongoose.connect('mongodb+srv://gokulramcse:wKgXMpHf3Sem4IU2@cluster0.vt3z1ap.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const Item = require('./item'); // Create a model for MongoDB collection

// // CRUD Routes
// // Create
// app.post('/items', async (req, res) => {
//     try {
//         const newItem = new Item(req.body);
//         await newItem.save();
//         res.status(201).json(newItem);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Read All
// app.get('/items', async (req, res) => {
//     try {
//         const items = await Item.find();
//         res.status(200).json(items);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Read One
// app.get('/items/:id', async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id);
//         if (!item) throw new Error('Item not found');
//         res.status(200).json(item);
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// });

// // Update
// app.put('/items/:id', async (req, res) => {
//     try {
//         const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!item) throw new Error('Item not found');
//         res.status(200).json(item);
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// });

// // Delete
// app.delete('/items/:id', async (req, res) => {
//     try {
//         const item = await Item.findByIdAndDelete(req.params.id);
//         if (!item) throw new Error('Item not found');
//         res.status(200).json(item);
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// });

// app.use((err, req, res, next) => {
//     res.status(status).send({ message: err.message });
// });


// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(express.json());

// Connect to MongoDB

const mongoURI = 'mongodb+srv://gokulramcse:wKgXMpHf3Sem4IU2@cluster0.vt3z1ap.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Contact schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
});

const Contact = mongoose.model('Contact', contactSchema);

// CRUD operations

// Get all contacts
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific contact
app.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new contact
app.post('/contacts', async (req, res) => {
    const newContact = new Contact(req.body);
    try {
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing contact
app.put('/contacts/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedContact) {
            res.json(updatedContact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a contact
app.delete('/contacts/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (deletedContact) {
            res.json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
