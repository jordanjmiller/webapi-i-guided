console.log('its alive');

const express = require('express');

const server = express();

server.use(express.json); //need for put and post so server can read json

const db = require('./data/hubs-model.js');


server.get('/', (req, res) => { 
    res.send('Hello world!');
 });


server.get('/hobbits', (req, res) => {
    const hobbits = [
        {
            id: 1,
            name: 'sam'
        },
        {
            id: 2,
            name: 'frodo'
        },
    ]

    res.status(200).json(hobbits);
})

server.get('/hubs', (req,res) => {
    db.find().then(hubs => {
        res.status(200).json(hubs);
    })
    .catch(err => {
        res.status(500).json({ error: 'failed to get hubs from db'});
    });
});

server.post('/hubs', (req, res) => {
    const hubInfo = req.body;
    db.add(hubInfo).
        then(hub => {
            res.status(201).json(hub);
        })
        .catch(err => {
            res.status(500).json({ error: 'failed to add hub to db'});
        });
})

server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(count => {
        res.status(200).json({message: `hubs with id ${id} deleted`})
    })
    .catch(err => {
        res.status(500).json({ error: 'failed to delete hub from db'});
    });
})

const port = 8000;
server.listen(port, () => console.log('api running on port 8000'));