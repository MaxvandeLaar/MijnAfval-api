const express = require('express');
const router = express.Router();
const Announcements = require('./announcements');
const Garbage = require('./garbage');
const Locations = require('./locations');

router.use('/announcements', Announcements);
router.use('/garbage', Garbage);
router.use('/locations', Locations);

module.exports = router;
