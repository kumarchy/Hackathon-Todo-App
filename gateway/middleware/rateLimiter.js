import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});

export default limiter;
