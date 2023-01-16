import axios from "axios";


export function postPokemon(payload){
  // console.log("estoy en PostPokemon")
  // console.log(payload)
  return async function () {
    const response = await axios.post("/pokemons" , payload)
      return response;
    }
}

export function searchPoke(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get("/pokemons?name=" + name)
      // console.log(json.data)
      return dispatch({
        type: "SEARCH_NAME",
        payload: json.data,
      });
    } catch (err) {
      // console.log(err)
      return alert("Error en la consulta");
    }
  };
}


export function filterPokemonsByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function Sort(order){
  return {
      type: "SORT",
      payload: order
  }
}
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload
  };
}

export function filterByAttack(payload){
  return {
    type: "FILTER_BY_ATTACK",
    payload
  }
}

export function getPokemons() {
  return async function (dispatch) {
    const json = await axios.get("/pokemons");
    // console.log(json.data)
    dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}


export function getDetail(id) {
  return async function (dispatch) {
    try{
        const json = await axios.get(`/pokemons/${id}`);
    return dispatch({
      type: "GET_DETAILS",
      payload: json.data
    })
   
} catch(error) {
  console.log(error)
}
  }
}

export function getType() {
  return async function (dispatch) {
    const json = await axios.get("/types");
    return dispatch({
      type: "GET_TYPE",
      payload: json.data
    })
  }

}