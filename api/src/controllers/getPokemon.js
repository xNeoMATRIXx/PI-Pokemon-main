const axios = require("axios");
const { Pokemon, Type } = require("../db");


const getApiInfo = async () => {
    const resp = await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=40")
      .then((data) => {
        return data.data.results;
      })
      .then((data) => {
        return Promise.all(data.map((res) => axios.get(res.url)));
      })
      .then((data) => {
        return data.map((res) => res.data); 
      });
    let arrayPoke = resp.map((result) => {  
      return {
        id: result.id,
        name: result.name,
        types: result.types.map((t) => t.type.name), 
        image: result.sprites.front_default,
        life: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        speed: result.stats[3].base_stat,
        height: result.height,
        weight: result.weight,
      };
    });
    return arrayPoke;
  };


const getDbInfo = async () => {
    try{
      let results = await Pokemon.findAll({ 
          include:[{
            model: Type,
            through: { attributes: [] }
          }]
      })
      results =  results.map(p => {
        let tipos = p.types.map(t => t.name)
        return {
            id: p.id,
            name: p.name,
            image: p.image,
            life: p.life,
            attack: p.attack,
            defense: p.defense,
            speed: p.speed,
            height: p.height,
            weight: p.weight,
            types: tipos
            
        }
    })
      return results;
  }catch (err){
      console.log(err);
  }
} 


const getAllPokemons = async () => { 
  const apiInfo = await getApiInfo(); 
  const dbInfo = await getDbInfo();   
  const infoTotal = apiInfo.concat(dbInfo); 
  return infoTotal;
};


module.exports = getAllPokemons;