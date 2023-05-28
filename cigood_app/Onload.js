// AQUI SE REALIZAN LAS LLAMADAS A COMPONENTES ONLOAD

// VARIABLES LOCALES
import { TABLA_INGREDIENTES, GET_ALL, TABLA_DESPENSA,TABLA_RECETAS,TABLA_FILTROS } from './constants.js';

// ESTA funcion devuelve todas las recetas
export async function getRecetas() {
  try {
    const tabla = TABLA_RECETAS;
    const id = GET_ALL;
    
    const response = await fetch(`http://192.168.18.162:3000/api/data/${tabla}/${id}`);
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
    
    const response = await fetch(`http://192.168.18.162:3000/api/data/${tabla}/${id}`);
    const ingredientes = await response.json();

    console.log(ingredientes);
    return ingredientes;

  } catch (error) {
    console.error('Error al obtener los ingredientes:', error);
    throw error;
  }
}

// Esta funcion devuelve los ingredientes de la despensa de un usuario
export async function getIngredientes() {
  try {
    const tabla = TABLA_DESPENSA;
    const id = GET_ALL;
    
    const response = await fetch(`http://192.168.18.162:3000/api/data/${tabla}/${id}`);
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

export async function dropIngredientes(ingredientesB, borrar) {
  try {
    const tabla = TABLA_DESPENSA;
    let id = null;

    if (borrar === "varios") {
      id = ingredientesB;

    } else if (borrar === "{}") {
      id = GET_ALL;
    }
    
    await fetch(`http://192.168.18.162:3000/api/delete/${tabla}/${id}`);

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

    const response = await fetch(`http://192.168.1.139:3000/api/data/${tabla}/${id}`);
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

    const response = await fetch(`http://192.168.1.139:3000/api/data/${tabla}/${id}`);
    const ingredientes = await response.json();

    return ingredientes;

  } catch (error) {
    console.error('Error al obtener la despensa:', error);
    throw error;
  }
}

// Obtiene toda la tabla ingredientes
export async function addIngrediente(ingrediente) {
  try {
    const tabla = TABLA_DESPENSA;
    const producto = JSON.stringify(ingrediente);
    const usaurio = USUARIO_DIEGO;

    await fetch(`http://192.168.1.139:3000/api/insert/producto/${tabla}/${producto}/${usaurio}`);

  } catch (error) {
    console.error('Error al obtener la despensa:', error);
    throw error;
  }
}
