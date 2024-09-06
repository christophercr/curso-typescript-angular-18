// ⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇
//    Ejercicio 5 – Classes
// ⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈

// Objetivos:
// • Crear clases con propiedades y métodos tipados
// • Añadir modificadores de acceso a los miembros de la clase

export function exercise5_1() {

  // ======== Ejercicio 5.1 ========
  // TODO:
  // • Añadir tipos explícitos de parámetros al constructor
  // • Añadir parámetros tipados para almacenar valores

  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }

  const jane = new Person('Jane', 31);

  console.log('[Ejercicio 5.1]', `The new person's name is ${jane.name}.`);
}

export function exercise5_2() {
  // ======== Ejercicio 5.2 ========
  // TODO:
  // • Hacer explícitamente que las propiedades title y salary sean públicamente accesibles
  // • Reducir la clase al mínimo número de líneas de código manteniendo la funcionalidad

  class Employee {
    title: string;
    salary: number;

    constructor(title: string, salary: number) {
      this.title = title;
      this.salary = salary;
    }
  }

  const employee = new Employee('Engineer', 100000);

  console.log('[Ejercicio 5.2]', `The new employee's title is ${employee.title} and they earn $ ${employee.salary}.`);
}

export function exercise5_3() {
  // ======== Ejercicio 5.3 ========
  // TODO:
  // • Añadir tipados completos
  // • Hacer que la clase Snake herede de Animal
  // • Hacer que la clase Pony herede de Animal
  // • Hacer que el miembro 'name' no pueda ser accedido públicamente
  // • La clase Animal no debería ser instanciable.

  class Animal {
    constructor(name) {
    }

    move(meters) {
      console.log(`[Ejercicio 5.3] ${this.name} moved ${meters}m.`);
    }
  }

  class Snake {
    move(meters) {
      console.log('[Ejercicio 5.3] Slithering...');
      // debería llamar al método `move` del padre, con un deslizamiento (slithering) predeterminado de 5 metros
    }
  }

  class Pony {
    move(meters) {
      console.log('[Ejercicio 5.3] Galloping...');
      // debería llamar al método `move` del padre, con un galope predeterminado de 60 metros
    }
  }

  // La clase Animal no debería ser instanciable.
  // Elimina o comenta las 2 líneas a continuación para lograr el error deseado.
  const andrew = new Animal("Andrew the Animal");
  andrew.move(5);

  const sammy = new Snake("Sammy the Snake");
  sammy.move();
  console.log('[Ejercicio 5.3] sammy.name',sammy.name); // Debería devolver un error

  const pokey = new Pony("Pokey the Pony");
  pokey.move(34);
  console.log('[Ejercicio 5.3] pokey.name', pokey.name); // Debería devolver un error
}

export function exercise5_4() {
  // ======== Ejercicio 5.4 ========
  // TODO:
  // • Hacer que solo las clases Desk y Chair puedan ver el miembro manufacturer

  class Furniture {
    constructor(manufacturer: string = 'IKEA') {
    }
  }

  class Desk extends Furniture {
    kind() {
      console.log('[Ejercicio 5.4]', `This is a desk made by ${this.manufacturer}`);
    }
  }

  class Chair extends Furniture {
    kind() {
      console.log('[Ejercicio 5.4]', `This is a chair made by ${this.manufacturer}`);
    }
  }

  const desk = new Desk();
  desk.kind();
  desk.manufacturer; // Debería devolver un error

  const chair = new Chair();
  chair.kind();
  chair.manufacturer; // Debería devolver un error
}

export function exercise5_5() {
  // ======== Ejercicio 5.5 ========
  // TODO:
  // • Eliminar el error sin cambiar las referencias a `Student.school`

  class Student {
    public school: string = 'Harry Herpson High School';

    constructor(private name: string) {
    };

    introduction() {
      console.log('[Ejercicio 5.5]', `Hi, my name is ${this.name} and I attend ${Student.school}`);
    }
  }

  const student = new Student('Morty');
  console.log('[Ejercicio 5.5] Student.school', Student.school);
  student.introduction();
}
