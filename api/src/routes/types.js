const axios = require("axios");
const { Router } = require("express");
const { Type } = require("../db.js");

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const api = await axios.get("https://pokeapi.co/api/v2/type"); //Trae todos los tipos
    const types = await api.data // trae la respuesta en data
    for (let type of types.results) { //Entra a la propiedad results, a cada elemento..
      const find = await Type.findOrCreate({ where: {name: type.name}}); // Entra a la propiedad name y busca si ya existe 
      
    }
    res.json(await Type.findAll()); //Finalmente devuelvo todos los tipos de la Db.
  } catch (error) {
    next(error);
  }
});

module.exports = router;