import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";

const userRoutes = express.Router();

userRoutes.use(
    '/',
    createProxyMiddleware({
        target:process.env.USER_SERVICE_URL || 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '^/user': '' },
    })
)

export default userRoutes;