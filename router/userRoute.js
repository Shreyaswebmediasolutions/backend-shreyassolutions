const express = require('express');
const multer = require('multer');
const userController = require('../controller/user'); // Adjust the path as needed
const { verifyToken, authorizeUser } = require('../middleware/auth'); // Ensure the correct path for your auth middleware

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

// User Routes
router.get('/announcements', verifyToken, authorizeUser, userController.viewAnnouncements); // View Announcements
router.post('/apply-leave', verifyToken, authorizeUser, userController.applyLeave); // Apply for Leave
router.post('/work-mode', verifyToken, authorizeUser, userController.selectWorkMode); // Select Work Mode (WFO/WFH)
router.post('/clock-in', verifyToken, authorizeUser, upload.single('photo'), userController.clockIn); // Clock In (with photo)
router.post('/clock-out', verifyToken, authorizeUser, userController.clockOut); // Clock Out
router.get('/tasks', verifyToken, authorizeUser, userController.viewTasks); // View Tasks
router.post('/complete-task', verifyToken, authorizeUser, userController.markTaskCompleted); // Mark Task as Completed

module.exports = router;

