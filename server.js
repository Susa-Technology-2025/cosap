/**
 * CoSAP Backend Server with Chapa Payment Integration
 * 
 * SECURITY WARNING:
 * - The CHAPA_SECRET_KEY is stored ONLY in the .env file on the server
 * - It is NEVER exposed to the frontend/client
 * - .env is added to .gitignore and must NEVER be committed to version control
 * - In production, use environment variables set on your hosting platform (Render, Railway, Heroku, etc.)
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables from .env file
// In production, these should be set as environment variables on the hosting platform
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Serve static files from the dist folder (built React app)
app.use(express.static(path.join(__dirname, 'dist')));

// ============================================
// CHAPA PAYMENT API ENDPOINTS
// ============================================

/**
 * Initialize a Chapa payment transaction
 * POST /api/chapa/initialize
 * 
 * Request body:
 * {
 *   amount: number (required) - Amount in ETB
 *   currency: string (optional, default: "ETB")
 *   email: string (optional) - Donor email
 *   first_name: string (required)
 *   last_name: string (required)
 *   phone_number: string (optional)
 *   tx_ref: string (auto-generated) - Unique transaction reference
 *   callback_url: string (auto-generated)
 *   return_url: string (auto-generated)
 *   customization: object (optional) - title, description, logo
 * }
 */
app.post('/api/chapa/initialize', async (req, res) => {
  try {
    const {
      amount,
      currency = 'ETB',
      email,
      first_name,
      last_name,
      phone_number,
      customization
    } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }

    if (!first_name || !last_name) {
      return res.status(400).json({
        success: false,
        message: 'First name and last name are required'
      });
    }

    // Generate unique transaction reference
    const tx_ref = `COSP-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

    // Prepare Chapa API payload
    const chapaPayload = {
      amount: amount.toString(),
      currency,
      email: email || 'donation@cosap.org',
      first_name,
      last_name,
      phone_number: phone_number || '',
      tx_ref,
      callback_url: `${baseUrl}/api/chapa/callback`,
      return_url: `${baseUrl}/api/chapa/verify`,
      customization: customization || {
        title: 'CoSAP Donate',
        description: 'Empower women via Self Help Groups',
        logo: `${baseUrl}/cosap-logo.jpg`
      }
    };

    // Call Chapa API to initialize transaction
    const chapaResponse = await fetch('https://api.chapa.co/v1/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chapaPayload)
    });

    const chapaData = await chapaResponse.json();

    if (!chapaResponse.ok || !chapaData.status === 'success') {
      console.error('Chapa initialization failed:', chapaData);
      return res.status(400).json({
        success: false,
        message: chapaData.message || 'Payment initialization failed',
        details: chapaData
      });
    }

    // Return the checkout URL to the frontend
    res.json({
      success: true,
      message: 'Payment initialized successfully',
      data: {
        checkout_url: chapaData.data.checkout_url,
        tx_ref: tx_ref,
        amount: amount,
        currency: currency
      }
    });

  } catch (error) {
    console.error('Chapa initialize error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during payment initialization',
      error: error.message
    });
  }
});

/**
 * Verify a Chapa payment transaction
 * GET /api/chapa/verify?tx_ref=xxx
 * 
 * This is called after the user completes payment on Chapa
 * Chapa redirects to return_url with tx_ref query parameter
 */
app.get('/api/chapa/verify', async (req, res) => {
  try {
    const { tx_ref } = req.query;

    if (!tx_ref) {
      // Redirect to donation page with error
      return res.redirect('/#/donate?status=failed&message=Missing transaction reference');
    }

    // Verify the transaction with Chapa API
    const verifyResponse = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const verifyData = await verifyResponse.json();

    if (verifyResponse.ok && verifyData.status === 'success') {
      // Payment verified successfully
      // Here you would typically:
      // 1. Save the donation to your database
      // 2. Send confirmation email to donor
      // 3. Log the transaction
      console.log('Payment verified:', verifyData.data);

      // Redirect to donation success page
      return res.redirect(`/#/donate?status=success&tx_ref=${tx_ref}&amount=${verifyData.data.amount}`);
    } else {
      // Payment verification failed
      console.error('Payment verification failed:', verifyData);
      return res.redirect(`/#/donate?status=failed&message=${encodeURIComponent(verifyData.message || 'Payment verification failed')}`);
    }

  } catch (error) {
    console.error('Chapa verify error:', error);
    return res.redirect('/#/donate?status=failed&message=Server error during verification');
  }
});

/**
 * Chapa Webhook/Callback endpoint
 * POST /api/chapa/callback
 * 
 * Chapa sends webhook notifications here when payment status changes
 * This is useful for server-to-server notifications
 */
app.post('/api/chapa/callback', (req, res) => {
  try {
    const event = req.body;

    console.log('Chapa webhook received:', event);

    // Verify the webhook signature (recommended for production)
    // const signature = req.headers['x-chapa-signature'];
    // Verify signature against your secret...

    // Handle different event types
    if (event.status === 'success') {
      // Payment successful - save to database, send email, etc.
      console.log(`Payment successful for tx_ref: ${event.tx_ref}`);
    } else if (event.status === 'failed') {
      // Payment failed - log for investigation
      console.log(`Payment failed for tx_ref: ${event.tx_ref}`);
    }

    // Always return 200 to acknowledge receipt
    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Chapa callback error:', error);
    res.status(200).json({ received: true });
  }
});

/**
 * Health check endpoint
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CoSAP API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ============================================
// CONTACT FORM API ENDPOINT
// ============================================

// Simple JSON file storage for contact messages (replace with database in production)
const CONTACT_FILE = path.join(__dirname, 'data', 'contacts.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize contacts file if it doesn't exist
if (!fs.existsSync(CONTACT_FILE)) {
  fs.writeFileSync(CONTACT_FILE, JSON.stringify([], null, 2));
}

/**
 * Submit a contact form message
 * POST /api/contact
 * 
 * Request body:
 * {
 *   firstName: string (required),
 *   lastName: string (required),
 *   email: string (required),
 *   subject: string (required),
 *   message: string (required)
 * }
 * 
 * This endpoint:
 * 1. Validates the form data
 * 2. Stores the message in a local JSON file
 * 3. Sends an email notification to info@shgconsortiumeth.org
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Create contact entry
    const contactEntry = {
      id: `MSG-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      firstName,
      lastName,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    // Store in JSON file
    let contacts = [];
    try {
      const fileContent = fs.readFileSync(CONTACT_FILE, 'utf-8');
      contacts = JSON.parse(fileContent);
    } catch (e) {
      contacts = [];
    }
    contacts.push(contactEntry);
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(contacts, null, 2));

    // Send email notification to info@shgconsortiumeth.org
    const emailContent = `
New Contact Form Submission
============================
From: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}
Date: ${new Date().toLocaleString()}

Message:
${message}
============================
This message was submitted via the CoSAP website contact form.
    `.trim();

    // Log the message
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log(emailContent);
    console.log('===================================');

    // Attempt to send email notification via nodemailer (if SMTP configured)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const nodemailer = (await import('nodemailer')).default;
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: `"CoSAP Website" <${process.env.SMTP_USER}>`,
          to: 'info@shgconsortiumeth.org',
          replyTo: email,
          subject: `New Contact: ${subject}`,
          text: emailContent,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #0047AB; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
              </div>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${firstName} ${lastName}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
                  <tr><td style="padding: 8px; font-weight: bold;">Subject:</td><td style="padding: 8px;">${subject}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold;">Date:</td><td style="padding: 8px;">${new Date().toLocaleString()}</td></tr>
                </table>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
                <h4>Message:</h4>
                <p style="background: white; padding: 16px; border-radius: 4px; border: 1px solid #ddd;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          `
        });
        console.log(`[EMAIL] Notification sent to info@shgconsortiumeth.org`);
      } catch (emailError) {
        console.error('[EMAIL] Failed to send notification:', emailError.message);
      }
    } else {
      console.log('[EMAIL] SMTP not configured. Message stored locally only.');
      console.log('[EMAIL] To enable email notifications, set SMTP_HOST, SMTP_USER, SMTP_PASS in .env');
    }

    res.json({
      success: true,
      message: 'Your message has been received. We will get back to you shortly.',
      data: {
        id: contactEntry.id,
        submittedAt: contactEntry.submittedAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process your message. Please try again later.'
    });
  }
});

/**
 * Get contact messages (admin endpoint)
 * GET /api/contact
 */
app.get('/api/contact', (req, res) => {
  try {
    let contacts = [];
    try {
      const fileContent = fs.readFileSync(CONTACT_FILE, 'utf-8');
      contacts = JSON.parse(fileContent);
    } catch (e) {
      contacts = [];
    }
    res.json({
      success: true,
      data: contacts,
      total: contacts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages'
    });
  }
});

// ============================================
// FRONTEND ROUTING (SPA Support)
// ============================================

// For any route not matching API, serve the React app
// This must be the LAST route
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ============================================
// START SERVER
// ============================================
// Phusion Passenger support - don't call listen when running under Passenger
if (!process.env.PASSENGER_BASE_URI) {
  app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`CoSAP Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`API Base: http://localhost:${PORT}/api`);
    console.log(`========================================`);
  });
}

export default app;
