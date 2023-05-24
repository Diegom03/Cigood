// AQUI SE REALIZAN LAS LLAMADAS A COMPONENTES ONLOAD

// VARIABLES LOCALES
import { TABLA_INGREDIENTES, GET_ALL, TABLA_DESPENSA } from './constants.js';

// ESTA funcion devuelve todas las recetas
export function getRecetas() {
  return new Promise((resolve, reject) => {
    const recetas = [
      {
        id: 1,
        image: 'https://www.elmueble.com/medio/2023/02/21/flamenquines_fb20ca82_00436126_230221105239_600x600.jpg',
        name: 'Receta 1',
        description: 'Descripción de la receta 1',
      },
      {
        id: 2,
        image: 'https://i.blogs.es/173514/croquetas/450_1000.jpeg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
      {
        id: 3,
        image: 'https://www.elmueble.com/medio/2023/02/21/flamenquines_fb20ca82_00436126_230221105239_600x600.jpg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
      {
        id: 4,
        image: 'https://i.blogs.es/173514/croquetas/450_1000.jpeg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
      {
        id: 5,
        image: 'https://www.elmueble.com/medio/2023/02/21/flamenquines_fb20ca82_00436126_230221105239_600x600.jpg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
      {
        id: 6,
        image: 'https://i.blogs.es/173514/croquetas/450_1000.jpeg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
      {
        id: 7,
        image: 'https://www.elmueble.com/medio/2023/02/21/flamenquines_fb20ca82_00436126_230221105239_600x600.jpg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
    ];

    resolve(recetas);
  });
}


// Esta funcion devuelve los ingredientes de la despensa de un usuario
export async function getIngredientes() {
  try {
    const tabla = TABLA_DESPENSA;
    const id = GET_ALL;
    
    const response = await fetch(`http://192.168.1.139:3000/api/data/${tabla}/${id}`);
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
    
    await fetch(`http://192.168.1.139:3000/api/delete/${tabla}/${id}`);

  } catch (error) {
    console.error('Error al obtener los ingredientes:', error);
    throw error;
  }
}
