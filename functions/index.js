var functions = require('firebase-functions')
const admin = require('firebase-admin')
const fs = require('fs')
const path = require('path')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const stage = functions.config().env
  ? functions.config().env.stage
  : 'development'
const serviceAccount = require('./serviceAccount.' + stage + '.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://no-tengo-ganas-de-trabajar-dev.firebaseio.com'
})
const db = admin.database()

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})
exports.share = functions.https.onRequest((request, response) => {
  debugger // eslint-disable-line
  const ref = db.ref('/entries/' + request.query.id)
  ref.once('value', function(snapshot) {
    const item = snapshot.val()
    const metas = `
     <meta property="og:title" content="explosm" />
     <meta property="og:url" content="https://ntgdt.com/preview/${item.id}">
     ${
       item.image
         ? `<meta property="og:image" content="https://res.cloudinary.com/carlosvillu/image/fetch/w_300,f_auto/${
             item.image
           }">`
         : null
     }
     ${
       item.video
         ? `<meta property="og:image" content="${item.video.mp4}">`
         : null
     }
     `
    response.send(
      fs
        .readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
        .replace('</head>', `${metas}</head>`)
    )
  })
})
