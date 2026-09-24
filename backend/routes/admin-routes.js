const express = require('express');

const adminRouter = express.Router();

const {
    addAdmin,
    adminLogin,
    getAdmin,
    getAdminById
} = require('../controllers/admin-controller');

adminRouter.get('/signup', addAdmin);

adminRouter.post('/login', adminLogin);

adminRouter.get('/', getAdmin);

adminRouter.get('/:id', getAdminById);

module.exports = adminRouter;