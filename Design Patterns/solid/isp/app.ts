// TypeScript

// interface Worker {
//   work(): void;
//   eat(): void;
//   sleep(): void;
// }

// class Robot implements Worker {
//   work() {
//     console.log("Working");
//   }
//   eat() {} // Forced empty methods
//   sleep() {}
// }

interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
  work() {
    console.log("Working");
  }
  eat() {
    console.log("Eating");
  }
  sleep() {
    console.log("Sleeping");
  }
}

class Robot implements Workable {
  work() {
    console.log("Working");
  }
}