// TypeScript

// class User {
//   constructor(
//     public name: string,
//     public email: string,
//   ) {}

//   saveToDatabase() {
//     console.log(`Saving ${this.name} to database`);
//   }

//   sendEmail(message: string) {
//     console.log(`Sending email to ${this.email}: ${message}`);
//   }
// }

class User {
  constructor(
    public name: string,
    public email: string,
  ) {}
}

class UserRepository {
  save(user: User) {
    console.log(`Saving ${user.name} to database`);
  }
}

class EmailService {
  send(user: User, message: string) {
    console.log(`Sending email to ${user.email}: ${message}`);
  }
}
