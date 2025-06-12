require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Backend server!');
    }
);
const PORT = process.env.PORT || 2220;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

