const mongoose = require('mongoose')
const Titulo = require('../models/titulo')

const getAll = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio')
  res.status(200).json(titulos)
}

const createTitle = async (req, res) => {
  const titulo = new Titulo({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    genero: req.body.genero,
    descricao: req.body.descricao,
    estudio: req.body.estudio,
    criadoEm: req.body.criadoEm
  })
  //TODO : criar validação se filme já existe
  try {
    const novoTitulo = await titulo.save()
    res.status(201).json(novoTitulo)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
}

const updateOneTitulo = async (req, res) => {

  const id = req.body._id
  const nome = req.body.nome

  Titulo.updateOne({ _id: id }, {
    $set: {
      nome: nome
    }
  }, (err, result) => {
    if(err) return res.send(err)

    res.status(200).json({ message: 'Titulo atualizado com sucesso'})
  
  })
}

const deleteOneTitulo = async (req, res) => {

  const id = req.body._id

  Titulo.deleteOne({ _id: id }, {
    
  }, (err, result) => {
    if(err) return res.send(err)

    res.status(200).json({ message: 'Titulo excluido com sucesso'})
  
  })
}

const ProcurarId = async (req, res) => {
  const id = req.params.id
  Titulo.findById(id)
    .then((titulo) => {
      res.status(200).json(titulo);
  })
  .catch(err => next(err));
}

module.exports = {
  getAll,
  createTitle,
  updateOneTitulo,
  deleteOneTitulo,
  ProcurarId
}
