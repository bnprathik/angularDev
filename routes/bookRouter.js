

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const dbConfig = require('../config/database')
const Books = require('../models/books');
const https = require('https');
const bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter.get('/',(req,res,next) => {
    Books.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
});
bookRouter.post( '/',(req, res, next) => {
    console.log("in post of books");
    console.log(req.body);
    Books.create(req.body)
    .then((book) => {
        console.log('book stored ', book);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    }, (err) => next(err))
    .catch((err) => next(err));
})
// bookRouter.route('/:bName')
// .delete((req, res, next) => {
//     console.log(req.params.id);
//     Books.findByIdAndRemove(req.params.id)
//     .then((resp) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });
bookRouter.delete('/:bName',(req, res, next) => {
    console.log(req.params.bName);
    Books.remove({bookTitle: req.params.bName})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
// router.get('/register',(req,res,next)=>{
//     res.send('Register');
// });
bookRouter.post('/addUsingIsbn',(req, res, next)=>{
    console.log('in add book using isbn', req.body.isbn)
    var book1;
    var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + req.body.isbn;
    https.get(url, resp => {
        resp.setEncoding("utf8");
        let body = "";
        resp.on("data", data => {
          body += data;
        });
        resp.on("end", () => {
            console.log('result recieved')
            results = JSON.parse(body);
            if(results.totalItems) {
// console.log(results)
                var book = results.items[0];
                book1 = {   bookTitle:  (book["volumeInfo"]["title"]),
                        author:         (book["volumeInfo"]["authors"]),
                        thumbnailImage: (book["volumeInfo"]["imageLinks"]["thumbnail"]),
                        description:    (book["volumeInfo"]["description"]),
                        isbn:           req.body.isbn,
                        totalBooks:     1,
                        categories: (book["volumeInfo"]["categories"]),
                        averageRating:(book["volumeInfo"]["averageRating"]),
                        ratingsCount:(book["volumeInfo"]["ratingsCount"]),
                        remainingBooks: 1
                }
                console.log(book);
            }
        Books.create(book1)
        .then((book) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
        }, (err) => next(err))
        .catch((err) => next(err));
        });
        resp.on('error' , ()=>{
            console.log('error')
        })
    });
});

module.exports =bookRouter;