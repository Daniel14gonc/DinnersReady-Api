const {Router} = require('express')
const router = Router()
const {getUsers,
    createUser,
    getUserByID,
    delUser,
    updateUser,
    passwordCheck}= require("../controllers/index.usuario")

const {getAlacena}= require("../controllers/index.alacena")

// http://localhost:5000/users/3
router.get('/users',getUsers)
router.get('/login/:pass/:correo',passwordCheck)
router.get('/users/:id',getUserByID)
router.post('/users',createUser)
router.delete('/users/:id',delUser)
router.put('/users/:id',updateUser)
router.get('/alacena',getAlacena)
module.exports = router