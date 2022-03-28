const blogController = require('../controllers/blogController');
const express = require('express');
const router = express.Router();

  router.get('/blogs', blogController.blog_index);

  router.get('/blogs/create', blogController.blog_create_get);
  
  router.post('/blogs', blogController.blog_create_post);
  
  router.delete('/blogs/:id', blogController.blog_delete);
  
  router.get('/blogs/:id', blogController.blog_details);



module.exports = router;