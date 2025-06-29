import prisma from "../db/db.config.js";
import jwt from 'jsonwebtoken';
import axios from 'axios';

export const googleOAuthLogin = async (req, res) => {
  const { id_token } = req.body;
  console.log('🔐 ID Token received:', id_token); // 🔍 Debug

  if (!id_token) return res.status(400).json({ error: 'ID token missing' });

  try {
    const googleRes = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
    );

    const { email, name, aud, sub } = googleRes.data;
    console.log('🔍 Google Response:', googleRes.data); // Debug

    if (aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(403).json({ error: 'Invalid token audience' });
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          provider: 'google',
          providerId: sub,
        },
      });
      console.log('✅ New user created:', user);
    } else {
      console.log('📦 Existing user found:', user);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('❌ Google OAuth Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Google OAuth failed' });
  }
};
