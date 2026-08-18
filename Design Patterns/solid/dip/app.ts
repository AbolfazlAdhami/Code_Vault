// TypeScript

// class MySQLDatabase {
//   connect() {
//     console.log("Connected to MySQL");
//   }
// }

// class UserService {
//   private db = new MySQLDatabase(); // Tightly coupled

//   getUsers() {
//     this.db.connect();
//   }
// }

interface Database {
  connect(): void;
}

class MySQLDatabase implements Database {
  connect() {
    console.log("Connected to MySQL");
  }
}

class PostgreSQLDatabase implements Database {
  connect() {
    console.log("Connected to PostgreSQL");
  }
}

class UserService {
  constructor(private db: Database) {} // Depends on abstraction

  getUsers() {
    this.db.connect();
  }
}