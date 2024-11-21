// ⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇
//   Ejercicio 1 – Basic Types
// ⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈

// Objetivos:
// • Añadir las anotaciones de tipos primitivos, arrays y 'any'
// • Identificar cuando sucede el chequeo de tipos
// • Despues analizaremos el resultado de la transpilación


export function exercise1_1(): void {
  // ======== Ejercicio 1.1 ========
  // TODO:
  // • Añadir las anotaciones de tipos (ser lo más explícito posible)
  // • Corregir los errores (si aplica)

  const integer : number = 6;
  const float : number = 6.66;
  const hex : string = "0xf00d";
  const binary : string = "0b1010011010";
  const octal : string = "0o744";
  const negZero : number = -0;
  const actuallyNumber : unknown = NaN;
  const largestNumber : number = Number.MAX_VALUE;
  const mostBiglyNumber : number= Infinity;

  const members: any[] = [
    integer,
    float,
    hex,
    binary,
    octal,
    negZero,
    actuallyNumber,
    largestNumber,
    mostBiglyNumber
  ];

  members[0] = 12345;
  members[1] = 1.1;
  members[2] = "0xf00d";
  members[3] = "0b1010011010";
  members[4] = "0o744";
  members[5] =  -0;
  members[5] =  NaN;
  members[6] =  Number.MAX_VALUE;


  console.log('[Ejercicio 1.1]', members);
}
export function exercise1_2(): void {
  // ======== Ejercicio 1.2 ========
  // TODO:
  // • Añadir las anotaciones de tipos (ser lo más explícito posible)
  // • Corregir los errores (si aplica)

  const sequence: number [] = Array.from(Array(10).keys());
  const animals : string[] = ['pangolin', 'aardvark', 'echidna', 'binturong'];
 
  //const stringsAndNumbers: (string | number) [] = [1, 'one', 2, 'two', 3, 'three'];
  const stringsAndNumbers: [number, string, number, string, number, string] = [1, 'one', 2, 'two', 3, 'three'];
 
  //const allMyArrays : (string | number) [][]  = [sequence, animals, stringsAndNumbers];
  const allMyArrays :  [number[], string[], (string | number)[]]  = [sequence, animals, stringsAndNumbers];

  console.log('[Ejercicio 1.2]', allMyArrays);
}

export function exercise1_3() {
  // ======== Ejercicio 1.3 ========
  // TODO:
  // • Añadir las anotaciones de tipos (ser lo más explícito posible)
  // • Corregir los errores (si aplica)

  // Queremos representar un inventoryItem como una estructura en donde
  // el primer elemento es el su nombre y el segundo es la cantidad

  const inventoryItem : [string, number] = ['table', 11];

  // despues lo "destructuramos"
  const [name, qty] : [string, number] = inventoryItem;

  const msg = addInventory(name, qty);

  console.log('[Ejercicio 1.3]', msg);

  function addInventory(name: string, quantity: number): string {
    return `Added ${quantity} ${name}s to inventory.`;
  }
}

export function exercise1_4() {
  // ======== Ejercicio 1.4 ========
  // TODO:
  // • Corrige el error de tal manera que el nombre del elemento TShirtType sea mostrado en la consola del navegador

  const enum TShirtType {
    CrewNeck = "Crew Neck", // inicializado con una constante
    VNeck = "V Neck",
    Henley = "Henley",
    Polo = "Polo",
    SpecialPolo = Polo, // inicializado con otra entrada
    ScoopNeck = "Scoop Neck"
  }

  let myTShirtType = TShirtType.CrewNeck;

  console.log("[Ejercicio 1.4] My T-Shirt type: ", myTShirtType);

  const nameOfShirtType: string = myTShirtType;

  console.log("[Ejercicio 1.4] Real name of T-shirt type", nameOfShirtType);
}
