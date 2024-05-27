const fs = require('fs');
const path = require('path');
const posts = require('../data/data.json');

// Funzione per ottenere tutti i post
exports.getPosts = (req, res) => {
    const accept = req.headers.accept;

    res.format({
        'application/json': function () {
            res.json(posts);
        },
        'text/html': function () {
            let html = '<h1>Benvenuto nel mio blog!</h1><ul>';
            posts.forEach(post => {
                html += `
                        <li>
                            <h2>${post.title}</h2>
                            <img src="/imgs/posts/${post.image}" alt="${post.title}" style="width:300px">
                            <p>${post.content}</p>
                            <p>Tags: ${post.tags.join(', ')}</p>
                        </li>`;
            });
            html += '</ul>';
            res.send(html);
        },
        default: function () {
            res.status(406).send('Not Acceptable');
        }
    });
};

// Funzione per aggiungere un nuovo post
exports.addPost = (req, res) => {
    const { title, content, image, tags } = req.body;

    // Verifica che tutti i campi siano presenti nella richiesta
    if (!title || !content || !image || !tags) {
        return res.status(400).json({ error: 'Assicurati di fornire tutti i campi necessari: title, content, image e tags' });
    }

    // Crea un nuovo post
    const newPost = {
        title,
        content,
        image,
        tags
    };

    // Aggiungi il nuovo post all'array dei post
    posts.push(newPost);

    // Scrivi i dati aggiornati nel file data.json
    const dataFilePath = path.join(__dirname, '../data/data.json');
    fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
            console.error('Errore durante il salvataggio dei dati:', err);
            return res.status(500).json({ error: 'Errore durante il salvataggio dei dati' });
        }
        console.log('Dati salvati correttamente.');
        // Invia una risposta con il nuovo post aggiunto e lo status code 201 Created
        res.status(201).json(newPost);
    });
};

exports.getPostBySlug = (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    // Verifica se il post è stato trovato
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const accept = req.headers.accept;

    res.format({
        'application/json': function () {
            res.json(post);
        },
        'text/html': function () {
            const html = `
                <h2>${post.title}</h2>
                <img src="/imgs/posts/${post.image}" alt="${post.title}" style="width:300px">
                <p>${post.content}</p>
                <p>Tags: ${post.tags.join(', ')}</p>
            `;
            res.send(html);
        },
        default: function () {
            res.status(406).send('Not Acceptable');
        }
    });
};

exports.createPostPage = (req, res) => {
    const accept = req.headers.accept;

    if (accept && accept.includes('text/html')) {
        // Se la richiesta accetta HTML, restituisci una pagina HTML con un h1
        res.send('<h1>Creazione nuovo post</h1>');
    } else {
        // Altrimenti, restituisci un errore 406 per indicare che il tipo di risposta non è accettato
        res.status(406).send('Not Acceptable');
    }
};