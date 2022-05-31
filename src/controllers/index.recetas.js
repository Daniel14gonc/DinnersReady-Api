const {Pool} = require('pg')


const pool = new Pool ({
    host: 'dinnersready.cddkmwmgfell.us-east-1.rds.amazonaws.com',
    user: 'postgres',
    password: 'ketchup14',
    database: 'postgres',
    port: '5432'
})


const getAllRecetas = async (req,res)=>{
    try{
        const query = 'SELECT * FROM recetas;'
        console.log('asereje')
        const response = await pool.query(query)
        res.json(response.rows)
    }catch (e){
        console.log("ERROR")

        res.json({
            message:'Error'
        })
    }
}

const getRecetabyId = async (req, res) => {
    try{
        const id = req.params.id
        console.log(id)
        const query = 'SELECT * FROM recetas WHERE id = $1;'
        const response = await pool.query(query, [id])
        res.json(response.rows)
    }catch (e){
        console.log("ERROR")
        res.json({
            message:'Error'
        })
    }
}



const getSaved = async (req, res) =>{
    try{
        const correo = req.params.correo
        const response = await pool.query('select r.id, r.nombre, r.descripcion, r.dificultad, r.estrellas, r.autor, r.imagen from recetas r inner join guardado g on g.id_receta = r.id where correo_usuario = $1',[correo])
        res.json(response.rows)
    }catch (e){
        console.log("ERROR")

        res.json({
            message:'Error',
            error:e
        })
    }
}

module.exports = {
    getAllRecetas,
    getRecetabyId,
    getSaved
}