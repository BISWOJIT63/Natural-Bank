import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },

    // Banking Details
    accountId: { type: String, unique: true },
    balance: { type: Number, default: 0 },

    // Embed Card References
    debitCard: {
        cardNumber: String,
        cvv: String,
        expiryDate: String,
        isActive: { type: Boolean, default: true },
        limit: Number,
        variant: String
    },

    creditCard: {
        cardNumber: String,
        cvv: String,
        expiryDate: String,
        isActive: { type: Boolean, default: false },
        limit: Number,
        availableLimit: Number,
        variant: String
    },

    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
