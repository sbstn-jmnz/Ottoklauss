const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)

const express = require('express');
const cors = require('cors')

const router = express();

router.use(cors({ origin: true }))

router.get("/courses/:id", async (req, res) => {
  const toy = await admin
    .firestore()
    .collection("courses")
    .doc(req.params.id)
    .get().then((doc) => {
      if (doc.exists) {
        return { id: doc.id, data: doc.data() }
      } else {
        console.log("No such document!");
        return {}
      }
    });
  res.send(toy);
});

router.get("/courses", (req, res) => {
  const lista = [];
  const db = admin.firestore()
  db.collection("courses").get()
    .then(querySnapshot => {
      let promises = []
      for (let course of querySnapshot.docs) {
        lista.push({ id: course.id, data: course.data(), examples: [] })
        promises.push(course.ref.collection('examples').get())
      }
      return Promise.all(promises)
    })
    .then(data => {
      lista.forEach((course, index) => {
        let dataSource = data[index]
        dataSource.forEach(example => {
          course.examples.push({ id: example.id, data: example.data() })
        })
      })
      res.send(lista);
    })
});

router.post("/courses/:id/examples/:example_id", async (req, res) => {
  const toy = await admin
    .firestore()
    .collection("courses")
    .add(req.body)
    .then(docRef => {
      return docRef.id
    });
  res.send(toy);
});

router.put("/courses/:id", async (req, res) => {
  const toy = await admin
    .firestore()
    .collection("courses")
    .doc(req.params.id)
    .update(req.body).then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data()
      } else {
        console.log("No such document!");
        return {}
      }
    });
  res.send(toy);
});

router.delete("/courses/:id", async (req, res) => {
  const toy = await admin
    .firestore()
    .collection("courses")
    .doc(req.params.id)
    .delete();
  res.send(toy);
});

exports.api = functions.https.onRequest(router);