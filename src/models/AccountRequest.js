import mongoose from 'mongoose';

const AccountRequestSchema = new mongoose.Schema({
    // Application Details
    applicationId: {
        type: String,
        unique: true,
        required: true,
        // Format: REF-2024-NAT-000123
    },

    accountType: {
        type: String,
        enum: ['savings', 'current'],
        required: true
    },

    // Personal Information
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    pan: {
        type: String,
        required: true,
        uppercase: true,
        match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    },

    aadhar: {
        type: String,
        required: true,
        match: /^\d{12}$/
    },

    dob: {
        type: Date,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    // Application Status
    status: {
        type: String,
        enum: [
            'pending',           // Just submitted
            'under_review',      // Team is checking
            'approved',          // Approved, account created
            'rejected',          // Application rejected
            'waiting_deposit',   // Waiting for initial deposit
            'active'            // Fully activated
        ],
        default: 'pending'
    },

    // Generated Account Details (after approval)
    generatedAccountId: {
        type: String,
        unique: true,
        sparse: true // Allows null values
    },

    generatedCardNumber: {
        type: String,
        unique: true,
        sparse: true
    },

    // Verification
    isPanVerified: {
        type: Boolean,
        default: false
    },

    isAadharVerified: {
        type: Boolean,
        default: false
    },

    isMobileVerified: {
        type: Boolean,
        default: false
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    // Admin Notes
    reviewNotes: {
        type: String
    },

    rejectionReason: {
        type: String
    },

    // Timestamps
    submittedAt: {
        type: Date,
        default: Date.now
    },

    reviewedAt: {
        type: Date
    },

    approvedAt: {
        type: Date
    },

    activatedAt: {
        type: Date
    }

}, {
    timestamps: true
});

// Auto-generate application ID before saving
AccountRequestSchema.pre('save', async function (next) {
    if (!this.applicationId) {
        const year = new Date().getFullYear();
        // Ideally we should generate a sequential number, but for simplicity/concurrency safety without a counter collection,
        // we might use a timestamp or random component. However, the requirement asked for a sequential-like format.
        // For this implementation, we'll try to find the count. Note: this isn't race-condition proof but sufficient for this demo.
        try {
            const count = await mongoose.model('AccountRequest').countDocuments();
            const paddedCount = String(count + 1).padStart(6, '0');
            this.applicationId = `REF-${year}-NAT-${paddedCount}`;
        } catch (error) {
            // Fallback if count fails or model not yet registered (though it should be)
            this.applicationId = `REF-${year}-NAT-${Date.now().toString().slice(-6)}`;
        }
    }
    next();
});

export default mongoose.models.AccountRequest ||
    mongoose.model('AccountRequest', AccountRequestSchema);
