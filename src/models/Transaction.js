import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transactionId: { type: String, required: true, unique: true },
    type: { type: String, enum: ['debit', 'credit', 'transfer'], required: true },
    cardType: { type: String, enum: ['debit', 'credit'] },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'general' },
    status: { type: String, default: 'completed' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
