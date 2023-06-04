// AQUI SE REALIZAN LAS LLAMADAS A COMPONENTES ONLOAD

// VARIABLES LOCALES
import { TABLA_INGREDIENTES, GET_ALL, TABLA_DESPENSA, TABLA_RECETAS, TABLA_FILTROS, USUARIO_DIEGO, IP_GENERAL } from './constants.js';

// ESTA funcion devuelve todas las recetas
export async function getRecetas() {
  try {
    const tabla = TABLA_RECETAS;
    const id = GET_ALL;
    const url = `http://` + IP_GENERAL + `:3000/api/data/${tabla}/${id}`;
    console.log(url);
    const response = await fetch(url);
    console.log("hola "+response);
    const recetas = await response.json();

    const recetasConId = recetas.map((receta) => {
      return {
        ...receta,
        id: receta._id, // Utilizar "_producto" como el id
      };
    });

    console.log(recetasConId);
    return recetasConId;

  } catch (error) {
    console.error('Error al obtener las recetas:', error);
    throw error;
  }
}

export async function getFiltros() {
  try {
    const tabla = TABLA_FILTROS;
    const id = GET_ALL;

    const response = await fetch(`http://` + IP_GENERAL + `:3000/api/data/${tabla}/${id}`);
    const ingredientes = await response.json();

    return ingredientes;

  } catch (error) {
    console.error('Error al obtener los ingredientes:', error);
    throw error;
  }
}

//Devuelve los ingredientes que usa una receta
export async function getNameIngredientes(ingredientes) {
  const url = `http://${IP_GENERAL}:3000/api/nameingrediente/${ingredientes}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Esta funcion devuelve los ingredientes de la despensa de un usuario
export async function getIngredientes() {
  try {
    const tabla = TABLA_DESPENSA;
    const id = GET_ALL;

    const response = await fetch(`http://` + IP_GENERAL + `:3000/api/data/${tabla}/${id}`);
    const ingredientes = await response.json();

    const ingredientesConId = ingredientes.map((ingrediente) => {
      return {
        ...ingrediente,
        id: ingrediente._producto, // Utilizar "_producto" como el id
      };
    });

    console.log(ingredientesConId);
    return ingredientesConId;

  } catch (error) {
    console.error('Error al obtener los ingredientes:', error);
    throw error;
  }
}

// Elimina ingredientes 1 o varios
export async function dropIngredientes(ingredientesB, borrar) {
  try {
    const tabla = TABLA_DESPENSA;
    let id = null;

    if (borrar === "varios") {
      id = ingredientesB;

    } else if (borrar === "{}") {
      id = GET_ALL;
    }

    await fetch(`http://` + IP_GENERAL + `:3000/api/delete/${tabla}/${id}`);

  } catch (error) {
    console.error('Error al obtener los ingredientes:', error);
    throw error;
  }
}


// Agrega la despensa al asyncStorage
export async function asyncDespensa() {
  try {
    const tabla = TABLA_DESPENSA;
    const id = GET_ALL;

    const response = await fetch(`http://` + IP_GENERAL + `:3000/api/data/${tabla}/${id}`);
    const ingredientes = await response.json();

    return ingredientes;

  } catch (error) {
    console.error('Error al obtener la despensa:', error);
    throw error;
  }
}


// Obtiene toda la tabla ingredientes
export async function asyncIngredientes() {
  try {
    const tabla = TABLA_INGREDIENTES;
    const id = GET_ALL;

    const response = await fetch(`http://` + IP_GENERAL + `:3000/api/data/${tabla}/${id}`);
    const ingredientes = await response.json();

    return ingredientes;

  } catch (error) {
    console.error('Error al obtener la despensa:', error);
    throw error;
  }
}


// Añade un ingrediente a la despensa
export async function addIngrediente(ingrediente) {
  try {
    const tabla = TABLA_DESPENSA;
    const producto = JSON.stringify(ingrediente);
    const usaurio = USUARIO_DIEGO;

    await fetch(`http://` + IP_GENERAL + `:3000/api/insert/producto/${tabla}/${producto}/${usaurio}`);

  } catch (error) {
    console.error('Error al obtener la despensa:', error);
    throw error;
  }
}


// Añade un ingrediente a la despensa
export async function recetasDespensa(filtros) {
  try {
    const tabla = TABLA_RECETAS;
    const despensa = filtros;

    // Constrolar que no venga vacio FUTURO
    const response = await fetch(`http://` + IP_GENERAL + `:3000/api/filters/despensa/${tabla}/${despensa}`);
    const recetas = await response.json();

    // Agregar un _id único a cada receta basado en su posición en el array
    const recetasConId = recetas.map((receta, index) => {
      return {
        ...receta,
        _id: receta._id.toString(),
      };
    });

    console.log(recetasConId);
    return recetasConId;

  } catch (error) {
    console.error('Error al obtener las recetas:', error);
    throw error;
  }
}
