const {Pool} = require('pg')


const pool = new Pool ({
    host: 'dinnersready.cddkmwmgfell.us-east-1.rds.amazonaws.com',
    user: 'postgres',
    password: 'ketchup14',
    database: 'postgres',
    port: '5432'
})


const getAlacena = async (req,res)=>{
    try{
        const id = req.params.id
        const query = 'SELECT nombre_ingrediente FROM ingredientes_usuario WHERE id_usuario = $1'
        const response = await pool.query(query, [id])
        res.json(response.rows)
    }catch (e){
        console.log("ERROR")

        res.json({
            message:'Error'
        })
    }
}

const deleteAlacena = async (req,res)=>{
    try{
        const id = req.params.id
        const nombre = req.params.nombre
        const query = 'DELETE FROM ingredientes_usuario WHERE id_usuario = $1 AND nombre_ingrediente=$2'
        const response = await pool.query(query, [id, nombre])
        res.json(response.rows)
    } catch (e){
        console.log("ERROR")

        res.json({
            message:'Error'
        })
    }
}

const insertAlacena = async (req,res)=>{
    try{
        const id = req.params.id
        const nombre = req.params.nombre
        const query = 'INSERT INTO nombre_ingrediente VALUES ($1, $2)'
        const response = await pool.query(query, [id, nombre])
        res.json(response.rows)
    }catch (e){
        console.log("ERROR")

        res.json({
            message:'Error'
        })
    }
}
module.exports = {
    getAlacena
}