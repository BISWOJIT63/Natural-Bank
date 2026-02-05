// Simulated Database for Demo Mode
export const mockUser = {
    _id: 'mock-user-id',
    fullName: 'Demo User',
    email: 'demo@naturalbank.com',
    password: 'password', // For reference
    accountId: '9876543210',
    balance: 125000,
    debitCard: {
        cardNumber: '4532 9876 1234 5678',
        cvv: '123',
        expiryDate: '12/28',
        isActive: true,
        limit: 50000,
        variant: 'gold'
    },
    creditCard: {
        cardNumber: '5412 1111 2222 3333',
        cvv: '456',
        expiryDate: '06/29',
        isActive: true, // Active for demo
        limit: 100000,
        availableLimit: 85000,
        variant: 'platinum'
    },
    isAdmin: true // Grant admin access to demo user
};

export const mockTransactions = [
    { transactionId: 'TXN001', type: 'debit', amount: 4500, description: 'Amazon.in', createdAt: new Date().toISOString() },
    { transactionId: 'TXN002', type: 'debit', amount: 699, description: 'Netflix Subscription', createdAt: new Date().toISOString() },
    { transactionId: 'TXN003', type: 'debit', amount: 350, description: 'Starbucks', createdAt: new Date().toISOString() },
    { transactionId: 'TXN004', type: 'credit', amount: 50000, description: 'Salary Credit', createdAt: new Date().toISOString() },
];

export const mockAllUsers = [
    mockUser,
    { _id: 'u2', fullName: 'Alice Smith', email: 'alice@example.com', accountId: '1234567891', balance: 45000, isActive: true },
    { _id: 'u3', fullName: 'Bob Jones', email: 'bob@example.com', accountId: '1234567892', balance: 1200, isActive: false },
    { _id: 'u4', fullName: 'Charlie Day', email: 'charlie@example.com', accountId: '1234567893', balance: 890000, isActive: true },
];

export const mockAllTransactions = [
    ...mockTransactions,
    { transactionId: 'TXN005', type: 'debit', amount: 1200, description: 'Grocery Store', createdAt: new Date().toISOString(), userId: 'u2' },
    { transactionId: 'TXN006', type: 'credit', amount: 5000, description: 'Freelance Work', createdAt: new Date().toISOString(), userId: 'u3' },
];
