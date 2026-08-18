// TypeScript


// class AreaCalculator {
//   calculate(shape: any) {
//     if (shape.type === "circle") {
//       return Math.PI * shape.radius ** 2;
//     } else if (shape.type === "rectangle") {
//       return shape.width * shape.height;
//     }
//     // Adding triangle requires changing this method
//   }
// }

// TypeScript
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle implements Shape {
  constructor(
    private width: number,
    private height: number,
  ) {}
  area(): number {
    return this.width * this.height;
  }
}

class AreaCalculator {
  calculate(shape: Shape): number {
    return shape.area(); // Closed for modification, open for extension
  }
}
