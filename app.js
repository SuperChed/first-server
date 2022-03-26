const express = require('express');
const morgan = require('morgan');
const Blog = require('./models/blog');
const mongoose = require('mongoose');
const dbURI = "mongodb+srv://websnoot:Farmu5e678!@nodedb.t36od.mongodb.net/nodedb?retryWrites=true&w=majority";

// connect to mongodb - this is async
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => {
    // don't let server listen for user requests until db connection is ready
    console.log('connected to db!')
    app.listen(3000)
  })
  .catch((err) => console.log(err));

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

  // clunky manual middleware for logging...
    // app.use((req, res, next) => {
    //   console.log('--- new request made ---');
    //   console.log('host: ' + req.hostname);
    //   console.log('path: ' + req.path);
    //   console.log('method: ' + req.method);
    //   next();
    // });

  // better pre-made middleware for logging...
  app.use(morgan('dev'));  
  // express middleware for static files...
  app.use(express.static('public'));

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: "Why to blog",
    snippet: "my other blog is a blog",
    body: "Blogging is easy until you bloggy blog blog."
  });

  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
});  

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});