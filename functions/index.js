const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)

const express = require('express');
const cors = require('cors')

const router = express();

router.use(cors({ origin: true }))

router.get("/toy/:id", async (req, res) => {
  const toy = await admin
    .firestore()
    .collection("toys")
    .doc(req.params.id)
    .get().then((doc) => {
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

router.get("/toys", async (req, res) => {
  const toys = await admin
    .firestore()
    .collection("toys")
    .get();
  var lista = [];
  
  toys.docs.forEach(doc => {
    lista.push({ id: doc.id, data: doc.data() });
  });
  res.send(lista);
});

router.post("/toy", async (req, res) => {
  const toy = await admin
    .firestore()
    .collection("toys")
    .add(req.body)
    .then(docRef => {
      return docRef
    });
  res.send(toy);
});

router.put("/toy/:id", async (req, res) => {
  const toy = await admin
    .firestore()
    .collection("toys")
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

router.delete("/toy/:id", async (req, res) => {
  const toy = await admin
    .firestore()
    .collection("toys")
    .doc(req.params.id)
    .delete();
  res.send(toy);
});

exports.toys = functions.https.onRequest(router);