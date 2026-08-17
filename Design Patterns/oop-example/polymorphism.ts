interface Shape {
  area(): number;
  perimeter(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area(): number {
    return Math.PI * this.radius ** 2;
  }
  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle implements Shape {
  constructor(
    private width: number,
    private height: number,
  ) {}

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
  area(): number {
    return this.width * this.height;
  }
}

function calculateShapeArea(shape: Shape) {
  return shape.area();
}

let circle: Circle = new Circle(5);

let rectangle: Rectangle = new Rectangle(10, 5);

console.log("Circle Area:", calculateShapeArea(circle));
console.log("Rectangle Area:", calculateShapeArea(rectangle));
