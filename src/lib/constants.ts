// OAuth Configuration
export const OAUTH_CONFIG = {
  SMAG: {
    CLIENT_ID: import.meta.env.VITE_SMAG_CLIENT_ID || 'YOUR_SMAG_CLIENT_ID',
    REDIRECT_URI: import.meta.env.VITE_SMAG_REDIRECT_URI || 'http://localhost:5173/auth/callback',
    AUTH_URL: 'https://auth.smag.tech/oauth2/authorize',
  },
  ISAGRI: {
    CLIENT_ID: import.meta.env.VITE_ISAGRI_CLIENT_ID || 'YOUR_ISAGRI_CLIENT_ID',
    REDIRECT_URI: import.meta.env.VITE_ISAGRI_REDIRECT_URI || 'http://localhost:5173/auth/callback',
    AUTH_URL: 'https://auth.isagri.com/connect/authorize',
  },
};
