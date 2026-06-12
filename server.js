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
app.use(express.json());

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
        title: 'Donation to CoSAP',
        description: 'Support women empowerment through Self Help Groups in Ethiopia',
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
// FRONTEND ROUTING (SPA Support)
// ============================================

// For any route not matching API, serve the React app
// This must be the LAST route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`CoSAP Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Base: http://localhost:${PORT}/api`);
  console.log(`========================================`);
});

export default app;
