const express = require('express')
const router = express.Router()
const controller = require('../controllers/estudioController')

//listar todos os estudios/get/find
router.get('/', controller.getAll)

//criar um novo estudio/post/save
router.post('/', controller.createStudio)


//atualizar uma informacao especifica num estudio/patch/findById/save
router.put('/atualizar', controller.updateOneEstudio)


//deletar um estudio/delete/findById/remove
router.delete('/delete', controller.deleteOneEstudio)

//listar um estudio/get/findById
router.get('/:id', controller.ProcurarId)

module.exports = router