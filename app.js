const express = require('express');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');
const mongoose = require('mongoose');
const { render } = require('ejs');
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
// express middleware for encoding POST request
app.use(express.urlencoded({ extended: true }));


      // example of old routing logic before MVC applied
      // this creates a new hard-coded instance and saves it to the db
        // app.get('/add-blog', (req, res) => {
        //   const blog = new Blog({
        //     title: "Why to blog",
        //     snippet: "my other blog is a blog",
        //     body: "Blogging is easy until you bloggy blog blog."
        //   });
        //   // blog is an instance of Blog used to modify
        //   blog.save()
        //     .then((result) => {
        //       res.send(result)
        //     })
        //     .catch((err) => {
        //       console.log(err)
        //     })
        // });  

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// blog routes
app.use(blogRoutes);
  // could be scoped with app.use('/blogs', blogRoutes)
  // but would require changing blogRoutes file to remove '/blogs' for each route.


app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});