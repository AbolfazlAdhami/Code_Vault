// TypeScript
// class Bird {
//   fly() {
//     console.log("Flying");
//   }
// }

// class Penguin extends Bird {
//   fly() {
//     throw new Error("Penguins can't fly!"); // Violates LSP
//   }
// }


abstract class Bird {
  abstract move(): void;
}

class FlyingBird extends Bird {
  move() {
    console.log("Flying");
  }
}

class Penguin extends Bird {
  move() {
    console.log("Swimming / Walking");
  }
}