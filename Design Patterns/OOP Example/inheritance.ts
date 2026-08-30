class Product {
  constructor(
    public id: string,
    public price: number,
    public description: string,
  ) {}
  display(): void {
    console.log(`Product ID: ${this.id}, Price: ${this.price}, Description: ${this.description}`);
  }
}

class Book extends Product {
  constructor(
    public id: string,
    public price: number,
    public description: string,
    public title: string,
    public author: string,
  ) {
    super(id, price, description);
  }

  display(): void {
    super.display();
    console.log(`Author: ${this.author} Title: ${this.title}`);
  }
}

class Electronics extends Product {
  constructor(
    public id: string,
    public price: number,
    public description: string,
    public brand: string,
    public model: string,
  ) {
    super(id, price, description);
  }
  display(): void {
    super.display();
    console.log(`Brand: ${this.brand} Model: ${this.model}`);
  }
}

let book = new Book("B001", 29.99, "A thrilling mystery novel", "The Mystery of the Old House", "John Doe");
let electronics = new Electronics("E001", 499.99, "A high-end smartphone", "TechBrand", "XPhone 12");

book.display();
electronics.display();
