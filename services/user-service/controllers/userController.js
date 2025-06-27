import prisma from "../db/db.config.js";
const jwt = require('jsonwebtoken');
const axios = require('axios');
const prisma = new PrismaClient();

exports.googleOAuthLogin = async (req, res) => {
  const { id_token } = req.body;

  if (!id_token) return res.status(400).json({ error: 'ID token missing' });

  try {
    // 1. Verify with Google
    const googleRes = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
    );

    const { email, name, picture, aud } = googleRes.data;

    // 2. Check client ID matches
    if (aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(403).json({ error: 'Invalid token audience' });
    }

    // 3. Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }

    // 4. Sign JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
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
    console.error(err);
    res.status(500).json({ error: 'Google OAuth failed' });
  }
};
