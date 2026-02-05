import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AccountRequest from '@/models/AccountRequest';

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        // 1. Basic Validation (Backend side)
        const requiredFields = ['fullName', 'mobile', 'email', 'pan', 'aadhar', 'dob', 'address', 'accountType'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json({ success: false, message: `Missing required field: ${field}` }, { status: 400 });
            }
        }

        // 2. Check duplicates
        const existing = await AccountRequest.findOne({
            $or: [
                { pan: body.pan },
                { aadhar: body.aadhar },
                { mobile: body.mobile } // Optional: strict mobile check
            ]
        });

        if (existing) {
            return NextResponse.json({
                success: false,
                message: 'An application with these details (PAN, Aadhar, or Mobile) already exists.'
            }, { status: 409 });
        }

        // 3. Create Request
        const newRequest = new AccountRequest({
            ...body,
            status: 'pending' // Default status
        });

        try {
            await newRequest.save();
        } catch (dbError) {
            console.warn('Database save failed, falling back to mock response:', dbError.message);
            // Fallback for demo purposes if DB is not writable/reachable
            return NextResponse.json({
                success: true,
                message: 'Account request submitted successfully (Mock Mode - DB Connection Failed)',
                applicationId: newRequest.applicationId || `REF-MOCK-${Date.now()}`,
                warning: 'Database connection failed; this is a mock confirmation.'
            }, { status: 201 });
        }

        // 4. Mock Verification/Notifications (Console logs simulate email/SMS service)
        console.log(`[EMAIL SERVICE] Sending confirmation to ${body.email} for App ID: ${newRequest.applicationId}`);
        console.log(`[SMS SERVICE] Sending confirmation to ${body.mobile} for App ID: ${newRequest.applicationId}`);

        return NextResponse.json({
            success: true,
            message: 'Account request submitted successfully',
            applicationId: newRequest.applicationId
        }, { status: 201 });

    } catch (error) {
        console.error('Account Creation Error:', error);

        // Check if it's a connection error (like ENOTFOUND)
        if (error.code === 'ENOTFOUND' || error.message.includes('buffering timed out')) {
            const mockId = `REF-OFFLINE-${Date.now().toString().slice(-6)}`;
            return NextResponse.json({
                success: true,
                message: 'Account request submitted successfully (Offline Mode)',
                applicationId: mockId,
                warning: 'System is running in offline mode. Data was not saved to database.'
            }, { status: 201 });
        }

        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }, { status: 500 });
    }
}
