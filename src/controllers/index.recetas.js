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

module.exports = {
    getAllRecetas,
    getRecetabyId
}