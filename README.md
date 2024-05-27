Usando l'array dei post fornito con le relative immagini, 
- [x] creare un file di routing (routers/posts.js) che conterrà le rotte necessario per l'entità post.
All'interno creare le seguenti rotte:
- [x] / - index: ritornerà un html con una ul che stamperà la lista dei post
- [x] /:slug - show: tramite il parametro dinamico che rappresenta lo slug del post, ritornerà un json con i dati del post
- [x] /create - create: ritornerà un semplice html con un h1 con scritto Creazione nuovo post e nel caso venga richiesta una risposta diversa da html lancerà un errore 406
- [x] /:slug/download - download: dovrà far scaricare l’immagine del post rappresentato dallo slug. Attenzione, se lo slug contiene il simbolo / la rotta non funzionerà.
C’è qualche strumento che ci permette di codificare lo slug?
- [x] Scrivere tutte le funzioni delle rotte nel controller dedicato
- [x] Registrare il router dentro app.js con il prefisso /posts.
Bonus
- [x] Nella rotta show, aggiungere al post una proprietà image_url dove creare il link completo per l'immagine
- [x] Aggiungere un'altra proprietà image_download_url che invece dovrà far scaricare l'immagine puntando alla rotta download
- [x] Rendere navigabili i post nella index, stampando un link per la show di ciascuno
Buon Lavoro