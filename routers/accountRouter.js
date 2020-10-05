const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json({ data: accounts})
    })
    .catch(error => {
        res.status(500).json({error: error})
    });
});

router.get('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
        .then(account => {
            res.status(200).json({ data : account})
        })
        .catch(error => {
            res.status(500).json({error: error})
        });
});

router.post('/', (req, res) => {
    const accountInfo = req.body;

    // if i want to build validation middleware
    // it should check for validity before going to database

    db('accounts').insert(accountInfo, 'id')
        .then(id => {
            res.status(201).json({data: id})
        })
        .catch(error => {
            res.status(500).json({error : error})
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    db('accounts').where({id : req.params.id}).update(changes)
    .then(count => {
        res.status(200).json({data: count})
    })
    .catch(error => {
        res.status(500).json({error: error})
    });
});

router.delete('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id}).del()
    .then(count => {
        res.status(200).json({data: count})
    })
    .catch(error => {
        res.status(500).json({error: error})
    });
})


module.exports = router;