const {Pool} = require('pg')

const pool = new Pool ({
  host: 'dinnersready.cddkmwmgfell.us-east-1.rds.amazonaws.com',
  user: 'postgres',
  password: 'ketchup14',
  database: 'postgres',
  port: '5432'
})

const getCategorias = async (req,res)=>{
  try{
      
      const response = await pool.query('select distinct categoria from ingredientes')
      res.json(response.rows)
      console.log(response.rows)
  }catch (e){
      console.log("ERROR")

      res.json({
          message:'Error'
      })
  }
}

const getIngredientesPorCategorias = async (req, res)=>{
  try{
      const categoria = req.params.categoria
      const response = await pool.query('SELECT nombre FROM ingredientes where  categoria= $1 ',[categoria])
      res.json(response.rows)
  }catch (e){
      console.log("ERROR")

      res.json({
          message:'Error'
      })
  }
}
module.exports = {
  getCategorias,
  getIngredientesPorCategorias
}