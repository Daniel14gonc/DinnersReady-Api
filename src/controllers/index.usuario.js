const {Pool} = require('pg')
const bcrypt = require('bcryptjs')


const pool = new Pool ({
    host: 'dinnersready.cddkmwmgfell.us-east-1.rds.amazonaws.com',
    user: 'postgres',
    password: 'ketchup14',
    database: 'postgres',
    port: '5432'
})

const getUsers = async (req,res) => {
    try{
        const response = await pool.query('Select * from usuarios')
        res.status(200).json(response.rows)
    }catch (e){
        console.log("ERROR")

        res.json({
            message:'Error en getUsers',
            error: e
        })
    }
}

const getUserByID = async (req,res)=>{
    try{
        const id = req.params.correo
        const response = await pool.query('SELECT nombre, descripcion FROM usuarios WHERE correo = $1',[id])
        res.json(response.rows)
    }catch (e){
        console.log("ERROR")

        res.json({
            message:'Error'
        })
    }
}

const createUser = async(req,res)=>{
    const {name,correo,contrasena,descripcion} = req.body
    const rondas = 10
    const haspass = await bcrypt.hash(contrasena, rondas);
    console.log(name,correo,contrasena,descripcion)
    const response = await pool.query('insert into usuarios(nombre,correo,passw,descripcion) values($1,$2,$3,$4)',[name,correo,haspass,descripcion])
    console.log(response)
    res.json({
         message:'Agregado el usuario',
         body:{
             user:{name,correo,descripcion}
         },
         completado: true
    })
}
// localhost:5000/user/:id
// body 
const updateUser = async (req, res) => {
    const id = req.params.id
    const {correo,name,pass,descripcion} = req.body
    const rondas = 10
    const haspass = await bcrypt.hash(pass, rondas);
    console.log(id, name, pass)
    const response = await pool.query('Update usuarios SET correo = $1, nombre = $2, passw = $3,descripcion =$4 WHERE id =$5',[
        correo,
        name,
        haspass,
        descripcion,
        id
    ])
    console.log(response)
    res.json('User Updated')
}

const passwordCheck = async (req,res) =>{
    const correo = req.params.correo
    const pass = req.params.pass
    console.log(pass,correo)
    const response = await pool.query('SELECT * FROM usuarios WHERE correo = $1',[correo])
    console.log(response)
    if(response.rowCount === 0){
        res.json({
            completado: false
        })
    }else{
        const hashed = response.rows[0].passw
        const prn = await bcrypt.compare(pass,hashed)
        if(prn){
            res.json({
                completado: true
            })
        }else{
            res.json({
                completado: false
            })
        }
    }
    
    
}



const delUser = async(req,res) =>{
    const response = await pool.query('DELETE FROM usuarios where correo=$1',[req.params.correo])
    res.json(`User ${req.params.correo} eliminado de BD`)
}

const Save = async(req,res) => {
    const {correo,id} = req.body
    const hay = await pool.query('SELECT * FROM guardado WHERE id_receta = $1 and correo_usuario=$2',[id,correo])
    if(hay.rowCount === 0){
        const response = await pool.query('Insert into guardado(id_receta,correo_usuario) values($1 ,$2)',[id,correo])
        res.json(`Relacion ${req.params.id} Agregado a Saved`)
        
    }else{
        const response = await pool.query('delete from guardado WHERE id_receta = $1 and correo_usuario=$2 ',[id,correo])
        res.json(`Relacion ${req.params.id} Quitado de Saved`)
    }
    
    
}

module.exports = {
    getUsers,
    createUser,
    getUserByID,
    delUser,
    updateUser,
    passwordCheck,
    Save
}