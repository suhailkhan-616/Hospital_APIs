const express = require('express');
const router = express.Router();
const passport = require('passport');
const doctorController = require('../controllers/doctorController');

router.post('/doctors/register', doctorController.doctorSignup);
router.post('/doctors/login',doctorController.doctorLogin);
router.post('/patients/register',passport.authenticate('jwt',{session:false}), doctorController.patientRegister);
router.post('/patients/:id/createReport',passport.authenticate('jwt',{session:false}),doctorController.createReport);

router.get('/patients/:id/allReport',doctorController.allReports);
router.get('/reports/:status',doctorController.AllReports);

module.exports = router;