const express = require('express');
const cors = require('cors');
const authRoute = require('../server/routes/auth.js');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5005;
app.use(express.json());
app.use(cors());
app.use(authRoute);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});