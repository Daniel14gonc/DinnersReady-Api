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

const addIngrediente = async(req,res)=>{
  const {usuario,ingrediente} = req.body
  console.log(usuario,ingrediente)
  const response = await pool.query('insert into ingredientes_usuario values($1,$2)',[usuario,ingrediente])
  console.log(response)
  res.json({
       message:'Agregado el ingrediente',
       body:{
           user:{usuario,ingrediente}
       },
  })
}

module.exports = {
  getCategorias,
  getIngredientesPorCategorias,
  addIngrediente
}