const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/db'); // Ensure this path is correct
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// View Announcements
exports.viewAnnouncements = (req, res) => {
    const query = 'SELECT * FROM announcements ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error fetching announcements');
        res.status(200).json(results);
    });
};

// Apply for Leave
exports.applyLeave = (req, res) => {
    const { user_id, date, reason, duration } = req.body;
    const query = 'INSERT INTO leave_applications (user_id, date, reason, duration, status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user_id, date, reason, duration, 'Pending'], (err) => {
        if (err) return res.status(500).send('Error submitting leave application');
        res.status(200).send('Leave application submitted successfully');
    });
};

// Work Mode Selection (WFO/WFH)
exports.selectWorkMode = (req, res) => {
    const { user_id, work_mode } = req.body;
    const query = 'UPDATE attendance SET work_mode = ? WHERE user_id = ? AND date = CURDATE()';
    db.query(query, [work_mode, user_id], (err) => {
        if (err) return res.status(500).send('Error updating work mode');
        res.status(200).send('Work mode updated successfully');
    });
};

// Clock In (with photo upload)
exports.clockIn = (req, res) => {
    const { user_id } = req.body;
    const photo = req.file.path; // Camera photo captured

    const query = 'INSERT INTO attendance (user_id, clock_in, photo, date) VALUES (?, NOW(), ?, CURDATE())';
    db.query(query, [user_id, photo], (err) => {
        if (err) return res.status(500).send('Error clocking in');
        res.status(200).send('Clocked in successfully');
    });
};

// Clock Out
exports.clockOut = (req, res) => {
    const { user_id } = req.body;
    const query = 'UPDATE attendance SET clock_out = NOW() WHERE user_id = ? AND date = CURDATE()';
    db.query(query, [user_id], (err) => {
        if (err) return res.status(500).send('Error clocking out');
        res.status(200).send('Clocked out successfully');
    });
};

// Task Management (View tasks)
exports.viewTasks = (req, res) => {
    const user_id = req.user.id;  // Assuming user ID is in the JWT token
    const query = 'SELECT * FROM tasks WHERE assigned_to = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).send('Error fetching tasks');
        res.status(200).json(results);
    });
};

// Mark Task as Completed
exports.markTaskCompleted = (req, res) => {
    const { task_id } = req.body;
    const query = 'UPDATE tasks SET status = "Completed" WHERE id = ?';
    db.query(query, [task_id], (err) => {
        if (err) return res.status(500).send('Error marking task as completed');
        res.status(200).send('Task marked as completed');
    });
};
