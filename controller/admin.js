const db = require('../utils/db');
const authController = require('../controller/auth')
exports.trackAttendance = (req, res) => {
    const query = `
        SELECT u.name, a.status, a.date 
        FROM attendance a 
        JOIN users u ON a.user_id = u.id 
        ORDER BY a.date DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching attendance:', err);
            return res.status(500).send('Error fetching attendance');
        }
        res.status(200).json(results);
    });
};
// manage leave application

exports.manageLeaveApplications = (req, res) => {

    const { id, status } = req.body;

    const query = 'UPDATE leaves SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err) => {
        if (err) {
            console.error('Error updating leave status:', err);
            return res.status(500).send('Error updating leave status');
        }
        res.status(200).send('Leave application updated successfully');
    });
};
// manage announcements

exports.manageAnnouncements = {

    create: (req, res) => {
        const { title, content } = req.body;
        const query = 'INSERT INTO announcements (title, content) VALUES (?, ?)';
        db.query(query, [title, content], (err) => {
            if (err) {
                console.error('Error creating announcement:', err);
                return res.status(500).send('Error creating announcement');
            }
            res.status(201).send('Announcement created successfully');
        });
    },

    edit: (req, res) => {
        const { id, title, content } = req.body;
        const query = 'UPDATE announcements SET title = ?, content = ? WHERE id = ?';
        db.query(query, [title, content, id], (err) => {
            if (err) {
                console.error('Error editing announcement:', err);
                return res.status(500).send('Error editing announcement');
            }
            res.status(200).send('Announcement updated successfully');
        });
    },

    delete: (req, res) => {
        const { id } = req.body;
        const query = 'DELETE FROM announcements WHERE id = ?';
        db.query(query, [id], (err) => {
            if (err) {
                console.error('Error deleting announcement:', err);
                return res.status(500).send('Error deleting announcement');
            }
            res.status(200).send('Announcement deleted successfully');
        });
    },
};
// Monitor Tasks

exports.monitorTasks = {

    getAllTasks: (req, res) => {
        const query = `
            SELECT t.id, t.title, t.description, t.status, t.due_date, u.name as assigned_to 
            FROM tasks t 
            JOIN users u ON t.assigned_to = u.id;
        `;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching tasks:', err);
                return res.status(500).send('Error fetching tasks');
            }
            res.status(200).json(results);
        });
    },

    updateStatus: (req, res) => {
        const { id, status } = req.body;
        const query = 'UPDATE tasks SET status = ? WHERE id = ?';
        db.query(query, [status, id], (err) => {
            if (err) {
                console.error('Error updating task status:', err);
                return res.status(500).send('Error updating task status');
            }
            res.status(200).send('Task status updated successfully');
        });
    },

    sendReminder: (req, res) => {
        // Placeholder for reminder functionality (e.g., sending emails)
        res.status(200).send('Reminder sent successfully');
    },
};
