const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId
const { BostsModel, BookModel } = require('../models/bookModel');

//get afficherles livres
router.get ('/', (req, res) =>{
    BookModel.find((err, docs) => {
      if (!err)
      res.send(docs)
      else console.log("Erreur lors de l'obtention des données" + err);
    })
})

//Ajouter un livre

router.post('/', (req, res) => {
    const newBook = new BookModel({
        author: req.body.author,
        resume: req.body.resume,
        categorie: req.body.categorie,
        maisonedition: req.body.maisonedition,
        quantitestock: req.body.quantitestock,
        datedesortie: req.body.datedesortie
    })

    newBook.save((err, docs)=>{
        if (!err) res.send(docs)
        else console.log("erreur d'ajout de livre"+ err);
    })
} )

// update livre

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id)
  
  const updateBook = {
    author: req.body.author,
        resume: req.body.resume,
        categorie: req.body.categorie,
        maisonedition: req.body.maisonedition,
        quantitestock: req.body.quantitestock,
        datedesortie: req.body.datedesortie
  };

  BookModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateBook},
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de mise à jour: " + err);
    }
  )
});

// supprimer livre

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id)
    BookModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
          if (!err) res.send(docs);
          else console.log("Erreur de suppression : " + err);
        })
    });

// ----la Partie ou j'ai eu des blocage 
// Crer une commande

router.post("/commande", async (req, res) => {
  try {
    const book = await book.findOne({ _id: req.body.book_id });
    if (book.quantitestock < req.body.quantity) {
      res.status(400);
      res.send({ error: "Quantité indisponible" });
    }
    const commande = new Commande({
      quantityCom: req.body.quantity,
      etat: false,
      book_id: req.body.book_id,
    });

    book.quantitestock -= req.body.quantity;
    await commande.save();
    await book.save();
    res.send(commande);
  } catch {
    res.status(404);
    res.send({ error: "Livre introuvable" });
  }
});    

router.get("/commande", async (req, res) => {
  const commande = await Commande.find();
  res.send(commande);
});

//valider commandes
router.patch("/commande/valide/:id", async (req, res) => {
  try {
    const commande = await Commande.findOne({ _id: req.params.id });
    commande.etat = true;
    await commande.save();
    res.send(commande);
  } catch {
    res.status(404);
    res.send({ error: "Commande introuvable !" });
  }
});

module.exports = router