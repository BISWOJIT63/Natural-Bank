export const accountTypes = {
    savings: {
        id: 'savings',
        name: 'Savings Account',
        icon: <i className="ri-bank-line"></i>,
        description: 'Perfect for personal savings and daily transactions',

        features: [
            'Earn 4% interest per annum',
            'Free debit card',
            'Mobile & Internet banking',
            'Zero balance with conditions',
            'Insurance coverage up to ₹5 lakh'
        ],

        eligibility: {
            ageMin: 18,
            ageMax: 65,
            required: [
                'Indian citizen',
                'Valid PAN card',
                'Aadhar card',
                'Minimum deposit: ₹5,000',
                'Permanent address proof'
            ]
        },

        benefits: [
            'Monthly interest credit',
            'Free SMS alerts',
            'ATM withdrawals: 5 free per month',
            'Chequebook facility'
        ]
    },

    current: {
        id: 'current',
        name: 'Current Account',
        icon: <i className="ri-building-fill"></i>,
        description: 'Designed for business transactions and high-volume banking',

        features: [
            'Unlimited transactions',
            'Overdraft facility available',
            'Multiple user access',
            'Bulk payment options',
            'Business analytics dashboard'
        ],

        eligibility: {
            ageMin: 18,
            ageMax: 100,
            required: [
                'Business registration',
                'GST certificate',
                'PAN card (business)',
                'Minimum turnover: ₹5 lakh/year',
                'Business address proof',
                'Partnership deed (if applicable)'
            ]
        },

        benefits: [
            'No transaction limits',
            'Priority customer service',
            'Free bulk transaction processing',
            'Multi-currency support'
        ]
    }
};
