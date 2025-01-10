const express = require('express');
const adminController = require('../controller/admin');

const router = express.Router();

// Admin functionalities
router.get('/attendance', adminController.trackAttendance);
router.post('/leaves/manage', adminController.manageLeaveApplications);
router.post('/announcements/create', adminController.manageAnnouncements.create);
router.put('/announcements/edit', adminController.manageAnnouncements.edit);
router.delete('/announcements/delete', adminController.manageAnnouncements.delete);
router.get('/tasks', adminController.monitorTasks.getAllTasks);
router.put('/tasks/update-status', adminController.monitorTasks.updateStatus);
router.post('/tasks/reminder', adminController.monitorTasks.sendReminder);

module.exports = router;
