// Create web server application

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Create express application
const app = express();

// Configure application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure port
const port = process.env.PORT || 8080;

// Create router object
const router = express.Router();

// Route: /comments
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route: /comments
router.route('/comments')
  .post((req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'comments.json'), (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      const comments = JSON.parse(data);
      const newComment = {
        id: Date.now(),
        name: req.body.name,
        comment: req.body.comment,
      };
