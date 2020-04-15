const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

//datebase
const products = [
    {
        id: 1,
        name: 'laptop'
    },
    {
        id: 2,
        name: 'microphone'
    },
    {
        id: 3,
        name: 'PC'
    }
]

//setting
app.set('port', process.env.PORT || 3000);

//middlewars
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.get('/product', (req, res) => {
    res.json(products);
});

app.post('/product', (req, res) => {
    const {name} = req.body;
    products.push({
        id: products.length + 1,
        name
    });
    res.json('Successfully created')
});

app.put('/product/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    products.forEach((products, i) => {
        if(products.id == id){
            products.name = name;
        }
    });
    res.json('Successfully Updated');
});
app.delete('/product/:id', (req, res) => {
    const {id} = req.params;
    for(i in products){
        if(products[i].id == id){
        products.splice(i, 1);
        }
    }
    res.json('Succesfully Delete');
});

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
});