const express = require('express');
const router = express.Router();
const Proxy = require('deafvalapp-api-proxy');
const HttpStatus = require('http-status-codes');

const proxy = new Proxy();

router.get('/all', async (req, res, next) => {
    const zipCode = req.query.zipcode;
    const houseNumber = parseInt(req.query.houseNumber);
    const houseNumberAddition = req.query.houseNumberAddition ? req.query.houseNumberAddition : '';

    if (zipCode && houseNumber) {
        const announcements = await proxy.announcements.getAnnouncements(zipCode, houseNumber, houseNumberAddition);
        res.json(announcements);
    } else {
        res.status(HttpStatus.BAD_REQUEST).end();
    }
});

module.exports = router;
