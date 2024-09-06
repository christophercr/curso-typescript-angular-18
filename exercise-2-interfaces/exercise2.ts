// ⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇
//   Ejercicio 2 – Interfaces
// ⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈

// Objetivos:
// • Demostrar tipado estructural (duck typing)
// • Crear una interfaz e implementarla en una clase
// • Diferenciar alias de tipos de interfaces

export function exercise2_1() {
  // ======== Ejercicio 2.1 ========
  // TODO:
  // • Reemplazar el tipo del parámetro 'item' con una interfaz
  // • Hacer que variantId sea opcional

  function addToCart(item: { id: number, title: string, variantId: number }) {
    console.log('[Ejercicio 2.1]', `Adding "${item.title}" to cart.`);
  }

  addToCart({id: 1, title: 'Concrete shoes'});
}

export function exercise2_2() {
  // ======== Ejercicio 2.2 ========
  // TODO:
  // • Crear una interfaz `Coords` que tenga propiedades numéricas `latitude` y `longitude`.
  // • Extender la interfaz existente `City` (sin modificar la propia interface) añadiendo una
  //   propiedad `coords` del tipo `Coords`.
  // • Corregir errores (si aplica)

  // -- no editar esta interfaz
  // (pretender que esto viene de un fichero `foo.d.ts` de una librería externa)
  interface City {
    name: string;
  }
  // --------------------------

  const montreal = {
    coords: {
      latitude: 42.332,
      longitude: -73.324,
    },
    name: 'Montréal',
  };

  const tampa = {
    coords: {
      latitude: '27.9478',
      longitude: '-82.4584',
    },
    name: 'Tampa',
  };

  function getCityInfo(city: City) {
    const coords = `(${city.coords.latitude.toFixed(3)}, ${city.coords.longitude.toFixed(3)})`;
    return `${city.name.toUpperCase()} is located at ${coords}.`;
  }

  console.log('[Ejercicio 2.2]', `${getCityInfo(montreal)} \n\n ${getCityInfo(tampa)}`);
}

export function exercise2_3() {
  // ======== Ejercicio 2.3 ========
  // TODO: El propósito de este ejercicio es simplemente ilustrar un uso de `readonly`

  interface UserSchema {
    readonly id: number;
    name: string;
  }

  class User implements UserSchema {
    constructor(public name: string, readonly id: number) {
    }
  }

  const user = new User('Dog', 1);

  console.log('[Ejercicio 2.3] user.id', user.id); // readable

  user.name = 'Harold'; // writable
  user.id = 5; // not writable

  console.log(`[Ejercicio 2.3] User:`, user)
}
