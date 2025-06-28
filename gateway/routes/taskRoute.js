import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";

const taskRoute = express.Router();

taskRoute.use(
    '/',
    createProxyMiddleware({
        target:process.env.TASK_SERVICE_URL || 'http://localhost:5001',
        changeOrigin: true,
        pathRewrite: { '^/task': '' },
    })
)

export default taskRoute;