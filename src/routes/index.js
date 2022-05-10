const {Router} = require('express')
const router = Router()
const {getUsers,
    createUser,
    getUserByID,
    delUser,
    updateUser,
    passwordCheck}= require("../controllers/index.usuario")

const {getAlacena}= require("../controllers/index.alacena")
const {getCategorias,getIngredientesPorCategorias, addIngrediente, getIngredientesByUsuario, deleteIngredientByUsuario}= require("../controllers/index.ingredientes")
const {getAllRecetas, getRecetabyId}= require("../controllers/index.recetas")

// http://localhost:5000/
router.get('/users',getUsers)
router.get('/login/:pass/:correo',passwordCheck)
router.get('/users/:id',getUserByID)
router.post('/users',createUser)
router.delete('/users/:id',delUser)
router.put('/users/:id',updateUser)
router.post('/ingrediente',addIngrediente)
router.get('/alacena',getAlacena)
router.get('/categorias',getCategorias)
router.get('/ingredientes/:categoria/:correo',getIngredientesPorCategorias)
router.get('/ingredientes/:correo', getIngredientesByUsuario)
router.delete('/ingredientes/:correo/:ingrediente', deleteIngredientByUsuario)
router.get('/recetas', getAllRecetas)
router.get('/recetas/:id', getRecetabyId)


module.exports = router
