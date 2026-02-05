'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const formFields = {
    fullName: {
        label: 'Full Name (as per PAN)',
        type: 'text',
        placeholder: 'Enter your full name',
        validation: {
            required: true,
            minLength: 3,
            maxLength: 100,
            pattern: /^[a-zA-Z\s]+$/,
            errorMessage: 'Please enter a valid name (letters only)'
        }
    },
    mobile: {
        label: 'Mobile Number',
        type: 'tel',
        placeholder: '9876543210',
        prefix: '+91',
        validation: {
            required: true,
            pattern: /^[6-9]\d{9}$/,
            errorMessage: 'Please enter a valid 10-digit mobile number'
        },
        features: ['OTP verification required', 'This will be your registered mobile']
    },
    email: {
        label: 'Email Address',
        type: 'email',
        placeholder: 'your.email@example.com',
        validation: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: 'Please enter a valid email address'
        },
        features: ['Account statements will be sent here', 'Email verification required']
    },
    pan: {
        label: 'PAN Card Number',
        type: 'text',
        placeholder: 'ABCDE1234F',
        validation: {
            required: true,
            pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
            errorMessage: 'Please enter a valid PAN (e.g., ABCDE1234F)',
            transform: 'uppercase'
        },
        info: 'Your PAN must match your name exactly'
    },
    aadhar: {
        label: 'Aadhar Card Number',
        type: 'text',
        placeholder: 'XXXX XXXX 1234',
        validation: {
            required: true,
            pattern: /^\d{12}$/,
            errorMessage: 'Please enter a valid 12-digit Aadhar number'
        },
        features: ['eKYC verification will be done']
    },
    dob: {
        label: 'Date of Birth',
        type: 'date',
        validation: {
            required: true,
            // Logic handled in onSubmit/onChange relative to current date
            errorMessage: 'Date of birth is required'
        }
    },
    address: {
        label: 'Permanent Address',
        type: 'textarea',
        placeholder: 'Enter your complete address',
        validation: {
            required: true,
            minLength: 10,
            maxLength: 200,
            errorMessage: 'Address must be between 10 and 200 characters'
        }
    }
};

const PersonalDetailsForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (field, value) => {
        let finalValue = value;
        if (formFields[field].validation.transform === 'uppercase') {
            finalValue = value.toUpperCase();
        }

        setFormData(prev => ({ ...prev, [field]: finalValue }));

        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const validateField = (field, value) => {
        const rules = formFields[field].validation;
        if (!rules) return null;

        if (rules.required && !value) return 'This field is required';
        if (rules.minLength && value.length < rules.minLength) return rules.errorMessage || `Minimum ${rules.minLength} characters`;
        if (rules.maxLength && value.length > rules.maxLength) return rules.errorMessage || `Maximum ${rules.maxLength} characters`;
        if (rules.pattern && !rules.pattern.test(value)) return rules.errorMessage;

        if (field === 'dob') {
            const birthDate = new Date(value);
            const ageDiffMs = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDiffMs);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
            if (age < 18 || age > 65) return 'You must be between 18 and 65 years old';
        }

        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        Object.keys(formFields).forEach(field => {
            const error = validateField(field, formData[field] || '');
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setTouched(Object.keys(formFields).reduce((acc, curr) => ({ ...acc, [curr]: true }), {}));

        if (isValid) {
            onSubmit(formData);
        }
    };

    const inputClasses = "w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:bg-white/10 focus:border-[#00ff88] focus:outline-none transition-all";
    const labelClasses = "block text-sm font-medium text-white/70 mb-1";
    const errorClasses = "text-xs text-red-400 mt-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(formFields).map(([key, config]) => (
                    <div key={key} className={config.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label className={labelClasses}>
                            {config.label} {config.validation.required && <span className="text-[#00ff88]">*</span>}
                        </label>

                        <div className="relative">
                            {config.prefix && (
                                <span className="absolute z-10 left-4 top-3 text-white/90 pointer-events-none">{config.prefix}</span>
                            )}

                            {config.type === 'textarea' ? (
                                <textarea
                                    value={formData[key] || ''}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    onBlur={() => setTouched(prev => ({ ...prev, [key]: true }))}
                                    className={`${inputClasses} h-32 resize-none`}
                                    placeholder={config.placeholder}
                                />
                            ) : (
                                <input
                                    type={config.type}
                                    value={formData[key] || ''}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    onBlur={() => setTouched(prev => ({ ...prev, [key]: true }))}
                                    className={`${inputClasses} ${config.prefix ? 'pl-12' : ''}`}
                                    placeholder={config.placeholder}
                                />
                            )}
                        </div>

                        {touched[key] && errors[key] && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={errorClasses}>
                                {errors[key]}
                            </motion.p>
                        )}

                        {config.features && (
                            <ul className="mt-2 space-y-1">
                                {config.features.map((feature, idx) => (
                                    <li key={idx} className="text-xs text-white/40 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-[#00ff88] rounded-full"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {config.info && (
                            <p className="text-xs text-white/40 mt-1">{config.info}</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-[#00ff88] transition-colors" />
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                        I confirm that all the details provided above are correct and match my official documents.
                    </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-[#00ff88] transition-colors" />
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                        I agree to the Terms & Conditions and Privacy Policy of Natural Bank.
                    </span>
                </label>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black font-bold rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:scale-[1.01] transition-all duration-300"
                >
                    Create Account
                </button>
            </div>
        </form>
    );
};

export default PersonalDetailsForm;
