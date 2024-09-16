const express = require('express');
const app = express();
const User = require('./DBsetup');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/create', async (req, res) => {
    try {
        const { name, id } = req.body.user;
        const { products } = req.body;
        const newUser = await User.create({
            user: { name, id },
            products
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.patch('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { 'user.id': id },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findOneAndDelete({ 'user.id': id });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
