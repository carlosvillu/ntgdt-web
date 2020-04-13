var functions = require('firebase-functions')
const admin = require('firebase-admin')
const fs = require('fs')
const path = require('path')

const os = require('os')
const Busboy = require('busboy')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const stage = functions.config().env
  ? functions.config().env.stage
  : 'development'
const serviceAccount = require('./serviceAccount.' + stage + '.json')
const databaseURL =
  stage === 'development'
    ? 'https://no-tengo-ganas-de-trabajar-dev.firebaseio.com'
    : 'https://no-tengo-ganas-de-trabajar.firebaseio.com'

const bucketName =
  stage === 'development'
    ? 'no-tengo-ganas-de-trabajar-dev.appspot.com'
    : 'no-tengo-ganas-de-trabajar.appspot.com'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
  storageBucket: bucketName
})

const db = admin.database()

exports.uploadPhoto = functions.https.onRequest((req, res, next) => {
  if (req.method === 'POST') {
    const busboy = new Busboy({headers: req.headers})
    // This object will accumulate all the uploaded files, keyed by their name
    const uploads = {}

    // This callback will be invoked for each file uploaded
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log(
        `File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
      )

      const bucket = admin
        .storage()
        .bucket()
        .file(`uploads/${filename}`)

      // Note that os.tmpdir() is an in-memory file system, so should only
      // be used for files small enough to fit in memory.
      const filepath = path.join(os.tmpdir(), fieldname)
      uploads[fieldname] = {file: filepath, bucket}
      console.log(`Saving '${fieldname}' to uploads/${filename}`)
      // file.pipe(fs.createWriteStream(filepath))
      file.pipe(
        bucket.createWriteStream({
          public: true,
          metadata: {
            contentType: mimetype,
            cacheControl: 'public, max-age=300'
          }
        })
      )
    })

    // This callback will be invoked after all uploaded files are saved.
    busboy.on('finish', async () => {
      let myUrl = ''
      for (const name in uploads) {
        const upload = uploads[name]
        const bucket = upload.bucket
        const nextKey = db
          .ref()
          .child('uploads')
          .push().key

        console.log('nextKey', nextKey)
        const [url] = await bucket
          .getSignedUrl({action: 'read', expires: '03-01-2500'})
          .catch(next)

        myUrl = url

        console.log('url', url)
        await db.ref(`/uploads/${nextKey}`).set({
          image: url
        })
      }
      res.redirect(`/myPhoto?image=${myUrl}`)
    })

    // The raw bytes of the upload will be in req.rawBody.  Send it to busboy, and get
    // a callback when it's finished.
    busboy.end(req.rawBody)
  } else {
    // Client error - only support POST
    res.status(405).end()
  }
})

exports.share = functions.https.onRequest((request, response) => {
  const ref = db.ref('/entries/' + request.query.id)
  ref.once('value', function(snapshot) {
    const item = snapshot.val()
    const metas = `
     <meta property="og:title" content="${item.title}" />
     <meta property="og:url" content="https://ntgdt.com/meme?id=${item.id}">
     ${
       item.image
         ? `<meta property="og:image" content="https://res.cloudinary.com/carlosvillu/image/fetch/w_300,f_auto/${item.image}">`
         : ''
     }
     ${
       item.video
         ? `<meta property="og:image" content="${item.video.mp4}">`
         : ''
     }
     `
    response.send(
      fs
        .readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
        .replace('</head>', `${metas}</head>`)
    )
  })
})
