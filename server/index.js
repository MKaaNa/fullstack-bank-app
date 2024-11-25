const express = require('express');
const cors = require('cors');
const app = express();
//

const accountRouter = require('./routes/account'); // Hesap route'ları
const authRouter = require('./routes/auth'); // Kimlik doğrulama route'ları
const newCustomerRouter = require('./routes/newCustomer'); // Yeni müşteri route'ları
const customerRouter = require('./routes/customer');


app.use(express.json());
app.use(cors());

// Route'ları tanımlayın
app.use('/api/accounts', accountRouter);
app.use('/api/auth', authRouter);
app.use('/api/newcustomer', newCustomerRouter); // Yeni müşteri route'ları
app.use('/api/musteri', customerRouter); // Bu satırın doğru olduğundan emin olun

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




