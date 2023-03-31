import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 6 * 1000, // 6 seconds
  max: 2, //limit seach IP to 2 requests per 6 seconds
});

export default limiter;
