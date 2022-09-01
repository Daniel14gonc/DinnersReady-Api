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

const getRecomendacionRecetaAlacena = async (req, res) => {
    try{

        const usuario = req.params.correo
        const response = await pool.query('SELECT nombre_ingrediente FROM ingredientes_usuario WHERE correo_usuario = $1',[usuario])
        
        const query = 'SELECT id_receta, nombre_ingrediente FROM ingredientes_receta order by id_receta asc;'
        const response2 = await pool.query(query)
        
        console.log('si')
        recetas = response2.rows
        ingredientes = response.rows

        recomendacion = []
        nombre_ingrediente = []

        ingredientes.map((ingrediente) => {
             nombre_ingrediente.push(ingrediente.nombre_ingrediente)
        })

        console.log(nombre_ingrediente)

        var obj = recetas.reduce(function(r, e) {
            if (!r[e.id_receta]) r[e.id_receta] = e
            else r[e.id_receta] = Array.isArray(r[e.id_receta]) ? r[e.id_receta].concat(e) : [r[e.id_receta]].concat(e)
            return r;
          }, {})

        console.log(obj)
        
        var ings_receta = Object.keys(obj).map(e => obj[e])

        final = []
        for (let i = 0; i < ings_receta.length; i++){
            
            temp = []
            if (Array.isArray(ings_receta[i])) {
                ings_receta[i].map((receta) => {
                    if(nombre_ingrediente.includes(receta.nombre_ingrediente)){
                        temp.push(true)
                    }else{
                        temp.push(false)
                    }
                })
    
                if(!temp.includes(false)){
                    let object = ings_receta[i]
                    lista = []
                    object.map((o) => {
                        if(!lista.includes(o.id_receta)){
                            lista.push(o.id_receta)
                        }
                    })
                    console.log(lista)
                    final = [...final, ...lista]
                    console.log(final)
                }
            }
        }

        res.json({final})

    }catch (e){
        console.log("ERROR")
        console.log(e)
        res.json({
            message:'Error'
        })
    }
}

const getRecetacont = async (req, res) =>{
    try{
        const query = 'select max(id) from recetas r ;'
        const response = await pool.query(query)
        res.json(response.rows)
    }catch (e){
        console.log("ERROR")

        res.json({
            message:'Error'
        })
    }
}

const getRecetaCreada = async (req, res) => {
    try{
        const usuario = req.params.correo
        const response = await pool.query('SELECT * FROM recetas WHERE autor = $1',[usuario])
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

const createReceta = async (req, res) =>{
    try{
        const {nombre, descripcion, dificultad, estrellas, autor, link, ingredientes} = req.body

        const response = await pool.query('insert into recetas(nombre,descripcion,dificultad,estrellas, autor, inmagen) values($1,$2,$3,$4,$5,$6)',[nombre, descripcion, dificultad, estrellas, autor, link])
        const response2 = await pool.query('SELECT id FROM recetas WHERE nombre = $1 AND autor = $2 AND descripcion = $3', [nombre, autor, descripcion])
        const id = response2.rows[0].id
        ingredientes.map( async(element) => {
            await pool.query('INSERT INTO ingredientes_receta values ($1, $2, $3)', [id, element.ing, element.cantidad])
        })
        res.json({
            message: 'receta agregada'
        })
    }catch (e){
        console.log("ERROR")

        res.json({
            message:'Error',
            error:e
        })
    }
}

const getIngredientesByReceta = async (req, res) =>{
    try{

      const receta = req.params.receta
      const response = await pool.query('select ir.nombre_ingrediente, ir.cantidad from ingredientes_receta ir where ir.id_receta = $1',[receta])

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
    getSaved,
    getRecetacont,
    getRecomendacionRecetaAlacena,
    getRecetaCreada,
    getIngredientesByReceta,
    createReceta
}