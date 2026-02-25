require('dotenv').config()

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,

}));

const cookieParser = require('cookie-parser');
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes')
const { connectToDB } = require('./database/connection');

const User = require('./Models/usersModel');
const { verifyjwttoken } = require('./middleware/checkAuth');

app.use('/auth', authRoutes);
app.use('/api', taskRoutes);

app.get('/user', verifyjwttoken('token'), (req, res) => {

    if (!req.user) {

        return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json({ user: req.user });
}
)


app.listen(PORT, async () => {
    try {
        console.log(`Server is running on Port http://${PORT}`);
        await connectToDB(process.env.MONGO_URL);
    } catch (err) {
        console.log(err)
    }
})

