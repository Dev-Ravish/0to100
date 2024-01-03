const { Admin } = require("../db");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    Admin.findOne({
        username: req.headers.username,
        password: req.headers.password
    }).populate('createdCourses')
    .then(admin => {
            // If admin is found, attach it to the request for later use
        if (admin) {
            req.admin = admin;
            next(); 
        } else {
            // If no admin is found, respond with an authentication failure
            res.status(401).json({ message: 'Authentication failed' });
        }
    })
    .catch(error => {
        // If there's an error (admin not found or other error), pass the error to the next middleware
        console.error(error);
            res.status(500).send('Internal Server Error');

    });
}

module.exports = adminMiddleware;