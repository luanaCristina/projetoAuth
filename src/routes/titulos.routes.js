const express = require('express')
const router = express.Router()
const controller = require('../controllers/tituloController')

//listar todos os titulos/get/find
router.get('/', controller.getAll)

//criar um novo titulo/post/save
router.post('/', controller.createTitle)


//atualizar uma informacao especifica num titulo/patch/findById/save
router.put('/update', controller.updateOneTitulo)

//deletar um titulo/delete/findById/remove
router.delete('/delete', controller.deleteOneTitulo)

//listar um titulo/get/findById
router.get('/:id', controller.ProcurarId)

module.exports = router