// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Import Op to perform comparison operations in WHERE clauses - DO NOT MODIFY
const { Op } = require("sequelize");

// Express using json - DO NOT MODIFY
app.use(express.json());


// STEP 1
// All puppies in the database
// No WHERE clause
app.get('/puppies', async (req, res, next) => {
    let allPuppies;

    // Your code here
    allPuppies = await Puppy.findAll({
        order: [
            ['name', 'DESC']
        ]
    });

    res.json(allPuppies);
});


// STEP 2
// All puppies that have been microchipped
// WHERE clause with one exact value
app.get('/puppies/chipped', async (req, res, next) => {
    let chippedPuppies;

    // Your code here
    chippedPuppies = await Puppy.findAll({
        where:{
            microchipped: 1
        },
        order: [
            ['ageYrs', 'DESC'],
            ['name', 'ASC']
        ]
    })

    res.json(chippedPuppies);
});


// STEP 3
// One puppy matching a name param
// Finding one record by attribute
app.get('/puppies/name/:name', async (req, res, next) => {
    let puppyByName;
    
    // Your code here
    const puppyName = req.params.name;

    puppyByName = await Puppy.findOne({
        where: {name: puppyName}
    });

    res.json(puppyByName);
})


// BONUS STEP 5
// All puppies with breed ending in 'Shepherd'
// WHERE clause with a comparison
app.get('/puppies/shepherds', async (req, res, next) => {
    let shepherds;
    
    // Your code here
    shepherds = await Puppy.findAll({
        where: {
            breed:{[Op.endsWith]: 'Shepherd'}
        },
        order: [
            ['name', 'DESC']
        ]
    })

    res.json(shepherds);
})


// BONUS STEP 6
// All puppies with ageYrs <= 1yr and weightLbs <= 20lbs
// WHERE clause with multiple attributes and comparisons
app.get('/puppies/tinybabies', async (req, res, next) => {
    let tinyBabyPuppies;
    
    // Your code here
    tinyBabyPuppies = await Puppy.findAll({
        where: {
            ageYrs: {[Op.lt]: 1},
            weightLbs: {[Op.lt]: 20}
        },
        order: [
            ['ageYrs'],
            ['weightLbs']
        ]
    })

    res.json(tinyBabyPuppies);
})


// STEP 4
// One puppy matching an id param
// Finding one record by primary key
app.get('/puppies/:id', async (req, res, next) => {
    let puppyById;
    
    // Your code here
    const puppyId = req.params.id;

    puppyById = await Puppy.findByPk(puppyId);
    
    res.json(puppyById);
});


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));