const express = require('express');
const router = express.Router();
const Proxy = require('deafvalapp-api-proxy');
const HttpStatus = require('http-status-codes');

const proxy = new Proxy();

router.get('/schedule', async (req, res, next) => {
    const zipCode = req.query.zipcode;
    const houseNumber = parseInt(req.query.houseNumber);
    const houseNumberAddition = req.query.houseNumberAddition? req.query.houseNumberAddition:'';

    if (zipCode && houseNumber){
        const schedule = await proxy.garbage.getSchedule(zipCode, houseNumber, houseNumberAddition);
        res.json(schedule);
    } else {
        res.status(HttpStatus.BAD_REQUEST).end();
    }
});

router.get('/info', async (req, res, next) => {
    const zipCode = req.query.zipcode;
    const houseNumber = parseInt(req.query.houseNumber);
    const houseNumberAddition = req.query.houseNumberAddition? req.query.houseNumberAddition:'';

    if (zipCode && houseNumber){
        const info = await proxy.garbage.getGarbageInfo(zipCode, houseNumber, houseNumberAddition);
        res.json(info);
    } else {
        res.status(HttpStatus.BAD_REQUEST).end();
    }
});

module.exports = router;
