interface Shape {
  area(): number;
  premiter(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius;
  }

  premiter(): number {
    return Math.PI * 2 * this.radius;
  }
}

class Rectangle implements Shape {
  constructor(
    private width: number,
    private height: number,
  ) {}

  area(): number {
    return this.height * this.height;
  }

  premiter(): number {
    return 2 * (this.width + this.height);
  }
}

function calculateTotalArea(shape: Shape): number {
  return shape.area();
}

let circle: Circle = new Circle(5);
let rectangle: Rectangle = new Rectangle(4, 10);

console.log("Area of Circle: ", calculateTotalArea(circle));
console.log("Area of Rectangle: ", calculateTotalArea(rectangle));
