const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const accountRoute = require('./routes/account');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json());
app.use(cors());
app.use(accountRoute.Router);
app.use(authRoute);
app.use(profileRoute);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});