var functions = require('firebase-functions')
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const serviceAccount = require('./serviceAccount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://no-tengo-ganas-de-trabajar-dev.firebaseio.com'
})
const db = admin.database()

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})
exports.share = functions.https.onRequest((request, response) => {
  return response.send('Hi!!')
  //   const ref = db.ref('/entries/' + request.query.id)
  //   ref.once('value', function(snapshot) {
  //     const item = snapshot.val()
  //     const html = `
  // <!DOCTYPE html>
  // <html lang="es">
  //   <head>
  //     <meta charset="utf-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  //     <meta name="description" content="${request.headers['user-agent']}">
  //     <meta property="og:title" content="explosm" />
  //     <meta property="og:url" content="https://ntgdt.com/preview/${item.id}">
  //     ${
  //       item.image
  //         ? `<meta property="og:image" content="https://res.cloudinary.com/carlosvillu/image/fetch/w_300,f_auto/${
  //             item.image
  //           }">`
  //         : null
  //     }
  //     ${
  //       item.video
  //         ? `<meta property="og:image" content="${item.video.mp4}">`
  //         : null
  //     }
  //     </head>
  //     <body>${request.headers['user-agent']}</body>
  // </html>
  //     `
  //     response.send(html)
  //   })
})
