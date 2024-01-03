const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const newAdmin = await Admin.create({
        username: req.body.username,
        password: req.body.password
    });


    res.json({
        message: "Admin created successfully"
    });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const newCourse = await Course.create({
        title:  req.body.title,
        description:  req.body.description,
        price:  req.body.price,
        imageLink:  req.body.imageLink,
    });


    const adminAddedCourse = await Admin.findOneAndUpdate(
        {
            username: req.headers.username
        },
        {
            $push:{
                createdCourses: newCourse._id
            }
        },
        {
            new: true
        }
    );


    res.json({
        message: 'Course created successfully',
        courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const populatedAdmin = req.admin;

    res.json({
        courses: populatedAdmin?.createdCourses
    })
});

module.exports = router;