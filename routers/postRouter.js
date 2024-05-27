// routers/postRouter.js

const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');



// Rotte per l'entità post
router.get('/', postsController.getPosts);
router.post('/', postsController.addPost);

// Rotta per visualizzare un singolo post tramite lo slug
router.get('/:slug', postsController.getPostBySlug);

// Rotta per visualizzare la pagina di creazione di un nuovo post
router.get('/create', postsController.createPostPage);

// Rotta per il download dell'immagine
router.get('/:slug/download', postsController.downloadImageBySlug); 


module.exports = router;
