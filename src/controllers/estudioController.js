const mongoose = require('mongoose')
const Estudio = require('../models/estudio')
const jwt = require('jsonwebtoken')
const titulo = require('../models/titulo')

const SECRET = process.env.SECRET


const getAll = async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]
  // console.log(token)

  if (!token) {
    return res.status(403).send({message: "Kd a tokenzinnn"})
  }
  // usar método do jwt para autenticar a rota
    // verificação do token com o SECRET do projeto
  jwt.verify(token, SECRET, async (err) => {
    if (err) {
      res.status(403).send({ message: 'Token não válido', err})
    }

    const estudios = await Estudio.find()
    res.json(estudios)
  })
}

const createStudio = async (req, res) => {
  const estudio = new Estudio({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm,
  })
  const estudioJaExiste = await Estudio.findOne({nome: req.body.nome})
  if (estudioJaExiste) {
    return res.status(409).json({error: 'Estudio ja cadastrado.'})
  }
  try{
    const novoEstudio = await estudio.save()
    res.status(201).json(novoEstudio)
  } catch(err) {
    res.status(400).json({ message: err.message})
  }
}

const updateOneEstudio = async (req, res) => {

  const id = req.body._id
  const nome = req.body.nome

  Estudio.updateOne({ _id: id }, {
    $set: {
      nome: nome
    }
  }, (err, result) => {
    if(err) return res.send(err)

    res.status(200).json({ message: 'Estudio atualizado com sucesso'})
  
  })
}

const deleteOneEstudio = async (req, res) => {

  const id = req.body._id

  Estudio.deleteOne({ _id: id }, {
    
  }, (err, result) => {
    if(err) return res.send(err)

    res.status(200).json({ message: 'Estudio excluido com sucesso'})
  
  })
}

const ProcurarId = async (req, res) => {
  const id = req.params.id
  Estudio.findById(id)
    .then((estudio) => {
      res.status(200).json(estudio);
  })
  .catch(err => next(err));
}




module.exports = {
  getAll,
  createStudio,
  updateOneEstudio,
  deleteOneEstudio,
  ProcurarId
}
