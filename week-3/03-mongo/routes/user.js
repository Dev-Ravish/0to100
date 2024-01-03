const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const newUser = User.create({
        username: req.body.username,
        password: req.body.password
    })

    res.json({
        message: "User created successfully"
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course
        .find()
        .then(courses => {
            res.json(courses);
        })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
     User.findOneAndUpdate(
        {
            username: req.headers.username
        },
        {
            $push:{
                purchasedCourses: courseId
            }
        },
        {
            new:true
        }
    ).then(user => {
        res.json({
            message: 'Course purchased successfully'
        })
    }).catch(err=>{
        console.error(err);
        res.status(402).send('Invalid URL')
    })
    

});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    User.findOne({username: req.headers.username}).populate('purchasedCourses')
    .then(user => {
        res.json({
            purchasedCourses: user.purchasedCourses
        });
    })

    
});

module.exports = router