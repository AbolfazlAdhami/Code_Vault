class ArrayOfNumbers {
  constructor(public data: number[]) {}

  get(index: number): number {
    return this.data[index];
  }
}

class ArrayOfStrings {
  constructor(public data: string[]) {}

  get(index: number): string {
    return this.data[index];
  }
}

class ArrayOfAnything<T> {
  constructor(public data: T[]) {}

  get(index: number): T {
    return this.data[index];
  }
}

const arr = new ArrayOfAnything(["Apple", "Banana", "Cherry"]);
console.log(arr.get(1)); // Output: "Banana"

const arr2 = new ArrayOfAnything([1, 2, 3, 4, 5]);
console.log(arr2.get(2)); // Output: 3

// Generic function
function printStrings(arg: string[]): void {
  for (let i = 0; i < arg.length; i++) {
    console.log(arg[i]);
  }
}
function printNumber(arg: number[]): void {
  for (let i = 0; i < arg.length; i++) {
    console.log(arg[i]);
  }
}

function printAnything<T>(arg: T): void {
  console.log(arg);
}
printStrings(["Apple", "Banana", "Cherry"]); // Output: "Apple", "Banana", "Cherry"

printAnything<string>("Hello, World!"); // Output: "Hello, World!"
printAnything<number>(42); // Output: 42

// Generic constraints

class Car {
  print() {
    console.log("I am a car");
  }
}

class House {
  print() {
    console.log("I am a house");
  }
}

interface Printable {
  print(): void;
}

function printHousesOrCars<T extends Printable>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print();
  }
}
printHousesOrCars<House>([new House(), new House(), new House()]); // Output: "I am a house", "I am a house", "I am a house"
printHousesOrCars<Car>([new Car(), new Car(), new Car()]); // Output: "I am a car", "I am a car", "I am a car"
