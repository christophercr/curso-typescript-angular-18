// ⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇
//   Ejercicio 4 – Types
// ⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈

// Objetivos:
// • Entender cómo TypeScript realiza el análisis de flujo de código
// • Crear y aplicar tipos de unión e intersección
// • Usar guardas de tipos básicas (restringir tipos con typeof, instanceof, etc.)

export function exercise4_1() {

  // ======== Ejercicio 4.1 ========
  // TypeScript es inteligente sobre los posibles tipos de una variable,
  // dependiendo de la ruta del código.
  // TODO:
  // • Simplemente inspecciona los posibles tipos pasando el cursor sobre `text` para ver
  //   cómo cambia el tipo inferido si se pueden hacer suposiciones seguras
  //   sobre los posibles tipos dentro de la ruta del código dada.

  function trimmedLength1(text: string | null | undefined) {
    text; // text: string | null | undefined

    if (typeof text === 'string') {
      text; // text: string

      return text.trim().length;
    }

    text; // text: null | undefined
  }

  function trimmedLength2(text: string | null | undefined) {
    text; // text: string | null | undefined

    if (typeof text === 'string') {
      text; // text: string

      return text.trim().length;
    } else if (text == null) {
      text; // text: null | undefined (remember == coerces undefined)

      return;
    }

    text; // text: never
  }

  function trimmedLength3(text: string | null | undefined) {
    if (text) {
      return text.trim().length;
    }

    text; // text: string | null | undefined (because '' == false)
  }

  function trimmedLength4(text: string | null | undefined) {
    if (!text) {
      text;
      return;
    }

    return text.trim().length; // text: string
  }

  function trimmedLength5(text: any) {
    text; // text: any

    if (typeof text === 'string') {
      return text.trim().length; // text: string
    }

    text; // text: any (nota cómo TS no resta tipos de `any`)
  }

  console.log('[Ejercicio 4.1]', `${trimmedLength1("   hi     ")}`);
}

export function exercise4_2() {
  // ======== Ejercicio 4.2 ========
  // TODO:
  // • Usa un type guard para completar el cuerpo de la función `padLeft`.

  function padLeft(value: string, padding: number | string): string {
    // si padding es un número, retorna `${Array(padding + 1).join(' ')}${value}`
    // si padding es un string, retorna padding + value
  }

  console.log('[Ejercicio 4.2]', `
    ${padLeft('🐕', 0)}
    ${padLeft('🐕', '🐩')}
    ${padLeft('🐕', '🐩🐩')}
    ${padLeft('🐕', '🐩🐩🐩')}
    ${padLeft('🐕', '🐩🐩🐩🐩')}
  `);
}

export function exercise4_3() {
  // ======== Ejercicio 4.3 ========
  // TODO:
  // • Añadir anotaciones de tipo (excluyendo `any`)
  // • Inspeccionar el tipo inferido de `element` en diferentes ramas del código
  // • Finalmente convertir `flatten` en una función genérica

  const numbers = [1, 2, 3, [44, 55], 6, [77, 88], 9, 10];

  function flatten(array) {
    const flattened = [];

    for (const element of array) {
      if (Array.isArray(element)) {
        element; // any[]
        flattened.push(...element);
      } else {
        element; // any
        flattened.push(element);
      }
    }

    return flattened;
  }

  const flattenedNumbers = flatten(numbers);

  console.log('[Ejercicio 4.3]', flattenedNumbers);
}

export function exercise4_4() {
  // ======== Ejercicio 4.4 ========
  //
  // TODO:
  // • Tanto los pájaros como los peces ponen huevos. Solo los pájaros vuelan. Solo los peces nadan. Define
  //   dos nuevos tipos: `BirdLike` y `FishLike` basados en estos rasgos.
  // • Crea un alias de tipo para `Bird O Pez` llamado `Animal`
  // • Usa un type guard en `interrogateAnimal` para permitir que los peces naden y los pájaros vuelen.
  // • Añade cualquier anotación de tipo que falte, siendo lo más explícito posible.

  interface EggLayer {
    layEggs(): void;
  }

  interface Flyer {
    fly(height: number): void;
  }

  class Anfibio implements IAnfibio {
    altura: number;
    peso: number;
    swim(depth: number): void;
  }

  interface BirdLike extends Swimmer, EggLayer {
    
  }

  interface Swimmer {
    altura: number;
    peso: number;
    swim(depth: number): void;
  }

  // añade alias de tipo aquí
  // type BirdLike = Flyer & EggLayer;
  type FishLike = Swimmer & EggLayer;
  type Custom = IAnfibio & Swimmer;
  

  class Bird implements BirdLike {
    constructor(public species: string) {
    }

    layEggs(): void {
      console.log('[Ejercicio 4.4] Laying bird eggs.');
    }

    fly(height: number): void {
      console.log(`[Ejercicio 4.4] Flying to a height of ${height} meters.`);
    }
  }

  class Fish implements FishLike {
    constructor(public species: string) {
    }

    layEggs(): void {
      console.log('[Ejercicio 4.4] Laying fish eggs.');
    }

    swim(depth: number): void {
      console.log(`[Ejercicio 4.4] Swimming to depth of ${depth} meters.`);
    }
  }

  type Animal = Fish | Bird;

  function getRandomAnimal() {
    const animals: Animal[] = [
      new Bird('puffin'),
      new Bird('kittiwake'),
      new Fish('sea robin'),
      {nombre: 'dfd'}
    ];

    return animals[Math.floor(Math.random() * animals.length)];
  }

  function interrogateAnimal(animal = getRandomAnimal()) {
    if (animal instanceof Fish) {
       animal.swim(10); // call only if it is a fish
    }
    if (animal instanceof Bird) {
       animal.fly(10); // call only if it is a bird
    }

    return animal.species;
  }

  console.log('[Ejercicio 4.4]', `We've got a ${interrogateAnimal()} on our hands!`);
}

export function exercise4_5() {
  // ======== Ejercicio 4.5 ========
  //
  // TODO:
  // • Este ejercicio es solo para ilustrar el tipo resultante de una unión.
  // • Inspeccionar qué propiedades de 'game' están disponibles dentro de la función 'displayGame()'

  interface BoardGame {
    name: string;
    description: string;
    minimalAge: number;
    players: string;
    duration: string;
  }

  interface VideoGame {
    name: string
    description: string;
    minimalAge: number;
    players: string;
    online: boolean;
  }

  function displayGame(game: VideoGame | BoardGame) {
    console.log(`[Ejercicio 4.5] Game name: ${game.name}`);
  }
}

export function exercise4_6() {
  // ======== Ejercicio 4.6 ========
  //
  // TODO:
  // • Cambiar la función 'displayGameProperty()' para evitar llamarla con un propertyName no válido

  interface Game {
    name: string;
    players: number;
  }

  function displayGameProperty(game: Game, propertyName: string): void {
    console.log('[Ejercicio 4.6]', game[propertyName]);
  }

  const game: Game = {name: "Chess", players: 2};

  displayGameProperty(game, "name");
  displayGameProperty(game, "creator"); // debe dar un error de compilación porque Game no tiene la propiedad 'creator'!
}

export function exercise4_7() {
  // ======== Ejercicio 4.7 ========
  //
  // TODO:
  // • Esto es solo para ilustrar la utilidad de los tipos mapeados
  // • Verifica qué propiedades se pueden añadir con los tipos resultantes ButtonGeneric y ButtonGenericInvisible

  interface Button {
    buttonColor?: "primary" | "accent" | "warn" | "success" | "alert" | "white";
    icon?: string;
    label?: string;
    labelActivated?: string;
    labelSwitchFunction?: () => boolean;
    isEnabled?: boolean;
    iconActivated?: string;
    iconSwitchFunction?: () => boolean;
    className?: string;
  }

  interface InvisibleButton extends Button {
    isVisible?: boolean;
  }

  type UnusedLabelProps = "labelActivated" | "labelSwitchFunction";

  type UnusedIconProps = "iconActivated" | "iconSwitchFunction";

  type ButtonGeneric =
    Required<Pick<Button, Exclude<keyof Button, UnusedLabelProps | UnusedIconProps>>>
    & Pick<Button, UnusedIconProps>;

  type ButtonGenericInvisible =
    Required<Pick<InvisibleButton, Exclude<keyof InvisibleButton, UnusedLabelProps | UnusedIconProps>>>
    & Partial<Pick<InvisibleButton, UnusedIconProps>>;

  const genericBtn: ButtonGeneric = {
    // añadir algunas propiedades
  };

  const invisibleGenericBtn: ButtonGenericInvisible = {
    // añadir algunas propiedades
  };
}

export function exercise4_8() {
  // ======== Ejercicio 4.8 ========
  //
  // Aquí 'itemLocation' se define con el tipo any y se le asigna el valor de 10, pero lo usamos de manera insegura.
  //
  // TODO:
  // • Cambiar el tipo de 'itemLocation' por uno que no sea demasiado flexible pero que aún nos permita compilar el código
  // (aunque todavía podrían ocurrir errores en tiempo de ejecución)
  let itemLocation: any = 10;

  itemLocation.coordinates.x;
  itemLocation.coordinates.y;
  itemLocation.coordinates.z;

  const printLocation = (loc: string) => {
    console.log(loc.toLowerCase());
  };

  printLocation(itemLocation);

  itemLocation();

  const iPhoneLoc = new itemLocation();
}
