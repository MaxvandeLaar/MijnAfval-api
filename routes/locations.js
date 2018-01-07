const express = require('express');
const router = express.Router();
const Proxy = require('deafvalapp-api-proxy');
const HttpStatus = require('http-status-codes');

const proxy = new Proxy();

router.get('/address', async (req, res, next) => {
    const zipCode = req.query.zipcode;
    const houseNumber = parseInt(req.query.houseNumber);
    const houseNumberAddition = req.query.houseNumberAddition? req.query.houseNumberAddition:'';

    if (zipCode && houseNumber){
        const address = await proxy.locations.getAddress(zipCode, houseNumber, houseNumberAddition);
        res.json(address);
    } else {
        res.status(HttpStatus.BAD_REQUEST).end();
    }
});

router.get('/municipalities', async (req, res, next) => {
    const municipalities = await proxy.locations.getAllMunicipalities();
    res.json(municipalities);
});

router.get('/municipalityInfo', async (req, res, next) => {
    const zipCode = req.query.zipcode;
    const houseNumber = parseInt(req.query.houseNumber);
    const houseNumberAddition = req.query.houseNumberAddition? req.query.houseNumberAddition:'';

    if (zipCode && houseNumber){
        const municipalityInfo = await proxy.locations.getMunicipalityInfo(zipCode, houseNumber, houseNumberAddition);
        res.json(municipalityInfo);
    } else {
        res.status(HttpStatus.BAD_REQUEST).end();
    }
});
module.exports = router;
