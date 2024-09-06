// ⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇
//   Ejercicio 3 – Functions
// ⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈

// Objetivos:
// • Convertir funciones existentes de JavaScript a TypeScript
// • Entender las funciones como tipos
// • Convertir funciones específicamente tipadas a funciones
//   genéricas más flexibles

export function exercise3_1() {
  // ======== Ejercicio 3.1 ========
  // TODO:
  // • Añadir tipos explícitos de parámetros y tipos de retorno a la función `deposit`
  // • Hacer que el parámetro `message` de la función sea *opcional*

  const bankAccount = {
    money: 0,
    deposit(value, message) {
      this.money += value;
      if (message) {
        console.log(message);
      }
    }
  };

  bankAccount.deposit(20);
  bankAccount.deposit(10, 'Deposit received');

  console.log('[Ejercicio 3.1]', `Account value: $${bankAccount.money}`);
}

export function exercise3_2() {
  // ======== Ejercicio 3.2 ========
  // Para una palabra dada, calculamos su puntuación en Scrabble.
  // TODO:
  // • Añadir anotaciones de tipo donde sea posible

  function computeScore(word) {
    const letters = word.toUpperCase().split('');
    return letters.reduce((accum, curr) => accum += getPointsFor(curr), 0);
  }

  function getPointsFor(letter) {
    const lettersAndPoints = [
      ['AEOIULNRST', 1],
      ['DG', 2],
      ['BCMP', 3],
      ['FHVWY', 4],
      ['K', 5],
      ['JX', 8],
      ['QZ', 10],
    ];

    return lettersAndPoints.reduce((computedScore, pointsTuple) => {
      const [letters, score] = pointsTuple;
      if (letters.split('').find((ll) => ll === letter)) {
        return computedScore += score;
      }
      return computedScore;
    }, 0);
  }

  console.log('[Ejercicio 3.2]', `zoo is worth ${computeScore('zoo')} points.`);
}

export function exercise3_3() {
  // ======== Ejercicio 3.3 ========
  // TODO:
  // • Añadir tipos explícitos de parámetros y tipos de retorno
  // • Añadir un saludo predeterminado: "hola"

  function greet(greeting) {
    return greeting.toUpperCase();
  }

  const defaultGreeting = greet();
  const portugueseGreeting = greet('Oi como vai!');

  console.log('[Ejercicio 3.3]', defaultGreeting, portugueseGreeting);
}

export function exercise3_4() {
  // ======== Ejercicio 3.4 ========
  // TODO:
  // • Añadir anotación de tipo al parámetro
  // • Aunque esta función no retorna, añadir un tipo de retorno explícito

  function layEggs(quantity, color) {
    console.log(`[Ejercicio 3.4] You just laid ${quantity} ${color} eggs. Good job!`);
  }

  layEggs("blue", 10);
}

export function exercise3_5() {
  // ======== Ejercicio 3.5 ========
  // Aquí hemos inicializado dos variables con tipos de función.
  // Después las asignamos a funciones.
  // TODO:
  // • Corregir los errores

  let multiply: (val1: number, val2: number) => number;
  let capitalize: (val: string) => string;

  multiply = function (value: string): string {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  };

  capitalize = function (x: number, y: number): number {
    return x * y;
  };

  console.log('[Ejercicio 3.5]', capitalize(`nifty ${multiply(5, 10)}`));
}

export function exercise3_6() {
  // ======== Ejercicio 3.6 ========
  // Aquí, nuestra función `pushToCollection` acepta *cualquier* elemento y lo añade,
  // (indiscriminadamente) a *cualquier* tipo de array.
  //
  // Un par de problemas con esto:
  //
  //  1. El tipo `any` hace que perdamos TODA la información de tipado en nuestros parámetros.
  //  2. Esto nos ha causado problemas en tiempo de ejecución. (¡Fíjate en `incrementByTwo`!)
  //
  // TODO:
  // • Implementar `pushToCollection` como una función genérica. (Esto debería crear
  //   errores en tiempo de compilación en lugares donde se están añadiendo valores
  //   incorrectos a una colección dada. Corregir estos valores a los tipos correctos.)
  // • Una vez hecha genérica, `pushToCollection` debería ser lo suficientemente *genérica*
  //   para operar en elementos y colecciones de cualquier tipo, mientras sigue
  //   asegurando que coincidan.

  const numberCollection: number[] = [];
  const stringCollection: string[] = [];

  function pushToCollection(item, collection) {
    collection.push(item);
    return collection;
  }

  // Añadir algunas cosas a las colecciones
  pushToCollection(false, stringCollection);
  pushToCollection('hi', stringCollection);
  pushToCollection([], stringCollection);

  pushToCollection('1', numberCollection);
  pushToCollection('2', numberCollection);
  pushToCollection('3', numberCollection);

  const incrementedByTwo = numberCollection.map((num) => num + 2);

  console.log('[Ejercicio 3.6]', `[${incrementedByTwo}] should deeply equal [3,4,5]`);
}

export function exercise3_7() {
  // ======== Ejercicio 3.7 ========
  // TODO:
  // • Arreglar la función 'displayRecipe()' para asegurarnos de que la propiedad 'chef' esté presente cuando llamemos a la función

  abstract class Recipe {
    constructor(public name: string, public ingredients: string[]) {
    }
  }

  class ItalianRecipe extends Recipe {
  }

  class FrenchRecipe extends Recipe {
    constructor(name: string, ingredients: string[], public chef: string) {
      super(name, ingredients);
    }
  }

  class BrittanyRecipe extends FrenchRecipe {
  }

  function displayRecipe<T>(recipe: T): void {
    console.log(`[Ejercicio 3.7] This is a french recipe conceived by the following chef: ${recipe.chef}`); // la propiedad 'chef' SIEMPRE debe existir cuando se llama a displayRecipe()
  }

  const brittanyRecipe = new BrittanyRecipe("Crèpe Bretonne", ["Eggs", "Flour", "Salt", "..."], "Bertrand Denis");
  const italianRecipe = new ItalianRecipe("Spaghetti Bolognese", ["Pasta", "Tomatoes", "Garlic", "Onions", "..."]);

  displayRecipe(italianRecipe); // propiedad 'chef' no existe
  displayRecipe(brittanyRecipe); // OK
}
