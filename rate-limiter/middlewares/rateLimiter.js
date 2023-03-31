import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 6 * 1000, // 6 seconds
  max: 10, //limit seach IP to 2 requests per 6 seconds
  message: "Too many requests from this IP",
});

export default limiter;
