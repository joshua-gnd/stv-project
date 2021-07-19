const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://admin:password100@cluster0.ssyro.mongodb.net/Test?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const paymentSchema = new mongoose.Schema({
    id: String,
    itemId: String,
    paid: Boolean
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
    Payment
};