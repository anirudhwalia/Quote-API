const e = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');


const PORT = process.env.PORT || 4001;
app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
 const randomObj = getRandomElement(quotes);
 res.send({quote: randomObj});
});

app.get('/api/quotes', (req, res) => {
    if (req.query.person !== undefined) {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
        res.send({
          quotes: quotesByPerson
        });
      }
   else{
    res.send({quotes: quotes});
    }
});
app.post('/api/quotes', (req, res) => {
    const quPe = {quote: req.query.quote,
         person: req.query.person
        };
    if(quPe.quote && quPe.person){
        quotes.push(quPe);
        res.send({quote: quPe});
    }
    else{
        res.status(400).send();
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
