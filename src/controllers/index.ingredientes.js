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
      
      const response = await pool.query('select distinct categoria from ingredientes order by categoria asc')
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
  
      const categoria = req.params.categoria
      const correo = req.params.correo
      const response = await pool.query('select nombre from ingredientes where categoria = $1 except (select nombre_ingrediente  from ingredientes_usuario where correo_usuario = $2); ',[categoria,correo])
      res.json(response.rows)
  
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

const getIngredientesByUsuario = async (req, res) =>{
  try{
    const usuario = req.params.correo
    const response = await pool.query('SELECT nombre_ingrediente FROM ingredientes_usuario WHERE correo_usuario = $1',[usuario])
    console.log(response)
    res.json(response.rows)
  }catch (e){
    console.log("ERROR")

      res.json({
          message:'Error',
          error:e
      })
  }
  
}


const deleteIngredientByUsuario = async (req, res) =>{
  try{
    const correo = req.params.correo
    const ingrediente = req.params.ingrediente
    const response = await pool.query('DELETE FROM ingredientes_usuario WHERE correo_usuario = $1 AND nombre_ingrediente = $2',[correo, ingrediente])
    res.json(`${ingrediente} eliminado de Alacena de ${correo}`) 
  }catch (e){
    console.log("ERROR")

      res.json({
          message:'Error',
          error:e
      })
  }
}

module.exports = {
  getCategorias,
  getIngredientesPorCategorias,
  addIngrediente,
  getIngredientesByUsuario,
  deleteIngredientByUsuario
}