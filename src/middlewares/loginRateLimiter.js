const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 5,  
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again after 15 minutes",
    },
});

module.exports = limiter;
