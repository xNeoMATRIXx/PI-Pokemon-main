const { Router } = require("express");
const getAllPokemons = require("../controllers/getPokemon");
const router = Router();
const { Pokemon, Type } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name; //Recibo la request en una variable
    let pokemonsTotal = await getAllPokemons(); //Guardo mi controlador que trae todos los pokemons en una variable..
    if (name) { //Consulto si me pasan un nombre y lo busco en la variable de arriba
      name = name.trim()
      let pokemonName = await pokemonsTotal.filter((el) => 
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      pokemonName.length
        ? res.status(200).send(pokemonName) // Si lo encuentro lo devuelvo,
        : res.status(404).send("El pokemon ingresado no existe"); // y sino devuelvo el texto.
    } else {
      res.status(200).send(pokemonsTotal); //Sino devuelvo todos los pokemons
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => { //Busqueda por id
  try {
    const id = req.params.id;
    const pokemonsTotal = await getAllPokemons();
    if (id) { //Si me pasan un ID, filtro el que coincida con ese mismo, sino devuelvo texto.
      let pokemonId = pokemonsTotal.filter((el) => el.id == id); 
      pokemonId.length
        ? res.status(200).json(pokemonId)
        : res.status(404).send("No se encontró el pokemon");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => { //Ruta de creacion del pokemon
  try {
    let { name, image, life, attack, defense, speed, height, weight, types} = req.body //Datos que necesito pedir
    // console.log(types)
    const newPokemon = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    if (!name) return res.json({ info: "El nombre es obligatorio" });

    if(Array.isArray(types) && types.length){ //Consulto si lo que me llega en TYPES, es un arreglo y si tiene algo adentro.
      // console.log(types)
      for (let type of types) { //Entra a la propiedad, a cada elemento..
        try{
          const find = await Type.findOrCreate({ where: {name: type}}); // Entra a la propiedad name y busca si ya existe  
          await newPokemon.addType(find[0]) //Una vez que se resuelva la promesa del Pokemon.create, le agrego los tipos
        }catch(err){
          console.log(err)
        }
      }
     
     return res.status(201).json({newPokemon});
    }else{
      return res.status(500).json({message:"el type esta vacio"});
    }
  } catch (err) {
    // console.log(err)
    res.status(400).send(err);
  }
})


module.exports = router; 