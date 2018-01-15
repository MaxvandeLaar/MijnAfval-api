const express = require('express');
const router = express.Router();
const Proxy = require('deafvalapp-api-proxy');
const HttpStatus = require('http-status-codes');
const moment = require('moment');

const proxy = new Proxy();

router.get('/schedule', async (req, res, next) => {
    const zipCode = req.query.zipcode;
    const houseNumber = parseInt(req.query.houseNumber);
    const houseNumberAddition = req.query.houseNumberAddition ? req.query.houseNumberAddition : '';

    if (zipCode && houseNumber) {
        const schedule = await proxy.garbage.getSchedule(zipCode, houseNumber, houseNumberAddition);
        res.json(schedule);
    } else {
        res.status(HttpStatus.BAD_REQUEST).end();
    }
});

router.get('/upcoming', async (req, res, next) => {
    const zipCode = req.query.zipcode;
    const houseNumber = parseInt(req.query.houseNumber);
    const houseNumberAddition = req.query.houseNumberAddition ? req.query.houseNumberAddition : '';
    const fromNow = req.query.fromNow && parseInt(req.query.fromNow) ? parseInt(req.query.fromNow) : 14;

    if (zipCode && houseNumber) {
        const schedule = await proxy.garbage.getSchedule(zipCode, houseNumber, houseNumberAddition);

        let upcoming = [];

        schedule.forEach((item, i) => {
            item.dates.forEach((date) => {
                let currentDate = moment(date, 'YYYY-MM-DD');
                if (currentDate.isAfter(moment()) && currentDate.isBefore(moment().add(fromNow, "day"))){
                    upcoming.push({type: item.type, date: currentDate.format()});
                }
            });
        });

        upcoming.sort((a, b) => {
            let current = moment(a.date, 'YYYY-MM-DD');
            let next = moment(b.date, 'YYYY-MM-DD');

            if (current.isAfter(next)){
                return 1;
            } else if (current.isBefore(next)) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            } else if (a.name < b.name){
                return -1;
            }
            return 0;

        });

        res.json(upcoming);
    } else {
        res.status(HttpStatus.BAD_REQUEST).end();
    }
});

function getClosest(array){
    let upcoming = {type: null, date: null};
    let index = -1;
    array.forEach((item, i) => {
        if (!upcoming.date){
            upcoming.date = item.date;
            upcoming.type = item.type;
            index = i;
        } else {
            let upcomingDate = moment(upcoming.date, 'YYYY-MM-DD');
            let currentDate = moment(item.date, 'YYYY-MM-DD');
            if (currentDate.isBefore(upcomingDate)){
                upcoming.date = item.date;
                upcoming.type = item.type;
                index = i;
            }
        }
    });
    return {upcoming: upcoming, index: index};
}

router.get('/info', async (req, res, next) => {
    const zipCode = req.query.zipcode;
    const houseNumber = parseInt(req.query.houseNumber);
    const houseNumberAddition = req.query.houseNumberAddition ? req.query.houseNumberAddition : '';

    if (zipCode && houseNumber) {
        const info = await proxy.garbage.getGarbageInfo(zipCode, houseNumber, houseNumberAddition);
        res.json(info);
    } else {
        res.status(HttpStatus.BAD_REQUEST).end();
    }
});

module.exports = router;
