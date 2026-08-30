# SOLID Principles in TypeScript & Python

A practical guide to the SOLID principles, with examples focused on real
application/backend development.

------------------------------------------------------------------------

## Table of Contents

1.  [What is SOLID?](#what-is-solid)
2.  [S --- Single Responsibility
    Principle](#1-s--single-responsibility-principle)
3.  [O --- Open/Closed Principle](#2-o--openclosed-principle)
4.  [L --- Liskov Substitution
    Principle](#3-l--liskov-substitution-principle)
5.  [I --- Interface Segregation
    Principle](#4-i--interface-segregation-principle)
6.  [D --- Dependency Inversion
    Principle](#5-d--dependency-inversion-principle)
7.  [SOLID in a Real E-Commerce
    Application](#solid-in-a-real-e-commerce-application)
8.  [SOLID and Testing](#solid-and-testing)
9.  [Abstract Class vs Implements](#abstract-class-vs-implements)
10. [When to Use Interface vs Abstract
    Class](#when-to-use-interface-vs-abstract-class)
11. [SOLID vs Design Patterns](#solid-vs-design-patterns)
12. [Quick Cheat Sheet](#quick-cheat-sheet)

------------------------------------------------------------------------

# What is SOLID?

SOLID is a group of five object-oriented design principles intended to
make software:

-   Easier to understand
-   Easier to test
-   Easier to maintain
-   Easier to extend
-   Less tightly coupled

The five principles are:

  -----------------------------------------------------------------------
  Letter                  Principle               Simple meaning
  ----------------------- ----------------------- -----------------------
  **S**                   Single Responsibility   One class should have
                          Principle               one responsibility

  **O**                   Open/Closed Principle   Extend behavior without
                                                  constantly modifying
                                                  existing code

  **L**                   Liskov Substitution     A subtype should be
                          Principle               usable wherever its
                                                  base type is expected

  **I**                   Interface Segregation   Prefer small, focused
                          Principle               interfaces

  **D**                   Dependency Inversion    Depend on abstractions,
                          Principle               not concrete
                                                  implementations
  -----------------------------------------------------------------------

A useful mental model for a backend application is:

``` text
User
  ↓
Order
  ↓
Payment
  ↓
Notification
  ↓
Infrastructure
```

SOLID helps keep these responsibilities and dependencies under control.

------------------------------------------------------------------------

# 1. S --- Single Responsibility Principle

## Definition

> A class should have only one reason to change.

A class should not be responsible for several unrelated concerns.

## Bad example --- Python

``` python
class OrderService:

    def create_order(self, user, products):
        # Create order
        pass

    def save_to_database(self, order):
        # Database logic
        pass

    def pay(self, order):
        # Payment logic
        pass

    def send_email(self, user):
        # Email logic
        pass
```

This class has several responsibilities:

``` text
OrderService
├── Create Order
├── Database
├── Payment
└── Email
```

Changing the email provider, database, or payment provider can force
changes to the same class.

## Better design

``` python
class OrderService:

    def create_order(self, user, products):
        return {
            "user": user,
            "products": products
        }


class OrderRepository:

    def save(self, order):
        print("Saving order to database")


class PaymentService:

    def pay(self, amount):
        print(f"Paying {amount}")


class EmailService:

    def send(self, email, message):
        print(f"Sending email to {email}")
```

Each class now has a focused responsibility:

``` text
OrderService       → Create orders
OrderRepository    → Persistence
PaymentService     → Payment
EmailService       → Email
```

## TypeScript

``` ts
class OrderService {
  createOrder(user: User, products: Product[]) {
    return {
      user,
      products,
    };
  }
}

class OrderRepository {
  save(order: Order) {
    // Database logic
  }
}

class PaymentService {
  pay(amount: number) {
    // Payment logic
  }
}

class EmailService {
  send(email: string, message: string) {
    // Email logic
  }
}
```

## Practical backend structure

``` text
orders/
├── order.controller.ts
├── order.service.ts
├── order.repository.ts
└── order.entity.ts
```

The goal is not to create a class for every line of code. The goal is to
separate genuinely different reasons for change.

------------------------------------------------------------------------

# 2. O --- Open/Closed Principle

## Definition

> Software entities should be open for extension but closed for
> modification.

When a new feature is added, prefer adding a new implementation rather
than repeatedly modifying a large existing class.

## Bad example

``` python
class PaymentService:

    def pay(self, payment_type, amount):

        if payment_type == "stripe":
            print("Stripe payment")

        elif payment_type == "paypal":
            print("PayPal payment")

        elif payment_type == "crypto":
            print("Crypto payment")
```

Adding Apple Pay requires modifying the existing class:

``` python
elif payment_type == "applepay":
    ...
```

As providers grow, the class becomes a large conditional structure.

## Better design

Define an abstraction:

``` python
from abc import ABC, abstractmethod


class Payment(ABC):

    @abstractmethod
    def pay(self, amount: float):
        pass
```

Implement providers separately:

``` python
class StripePayment(Payment):

    def pay(self, amount: float):
        print(f"Stripe: {amount}")


class PayPalPayment(Payment):

    def pay(self, amount: float):
        print(f"PayPal: {amount}")
```

The service depends on the abstraction:

``` python
class PaymentService:

    def __init__(self, payment: Payment):
        self.payment = payment

    def process(self, amount: float):
        self.payment.pay(amount)
```

Adding Apple Pay:

``` python
class ApplePayPayment(Payment):

    def pay(self, amount: float):
        print(f"Apple Pay: {amount}")
```

`PaymentService` does not need to change.

## TypeScript

``` ts
interface Payment {
  pay(amount: number): void;
}
```

``` ts
class StripePayment implements Payment {
  pay(amount: number) {
    console.log(`Stripe: ${amount}`);
  }
}

class PayPalPayment implements Payment {
  pay(amount: number) {
    console.log(`PayPal: ${amount}`);
  }
}
```

``` ts
class PaymentService {
  constructor(private payment: Payment) {}

  process(amount: number) {
    this.payment.pay(amount);
  }
}
```

New provider:

``` ts
class ApplePayPayment implements Payment {
  pay(amount: number) {
    console.log(`Apple Pay: ${amount}`);
  }
}
```

The important idea is:

``` text
Payment
├── Stripe
├── PayPal
└── ApplePay
```

rather than:

``` text
PaymentService
└── if Stripe
└── if PayPal
└── if ApplePay
└── if ...
```

------------------------------------------------------------------------

# 3. L --- Liskov Substitution Principle

## Definition

> If B is a subtype of A, objects of type B should be usable wherever
> objects of type A are expected without breaking the program.

A child class must respect the behavioral contract of its parent.

## Bad example

``` python
class Bird:

    def fly(self):
        print("Flying")


class Sparrow(Bird):

    def fly(self):
        print("Sparrow flying")


class Penguin(Bird):

    def fly(self):
        raise Exception("Penguins cannot fly")
```

Now:

``` python
def make_bird_fly(bird: Bird):
    bird.fly()
```

This works for `Sparrow` but breaks for `Penguin`.

The inheritance hierarchy says every `Bird` can `fly`, but that is not
actually true.

## Better design

Model the common capability instead:

``` python
from abc import ABC, abstractmethod


class Bird(ABC):

    @abstractmethod
    def move(self):
        pass
```

``` python
class Sparrow(Bird):

    def move(self):
        print("Flying")


class Penguin(Bird):

    def move(self):
        print("Walking")
```

Now every subtype satisfies the `move()` contract.

## Backend example

Suppose:

``` text
UserRepository
├── MongoUserRepository
└── PostgresUserRepository
```

The abstraction:

``` python
class UserRepository(ABC):

    @abstractmethod
    def find_by_id(self, user_id):
        pass
```

Implementations:

``` python
class MongoUserRepository(UserRepository):

    def find_by_id(self, user_id):
        # MongoDB implementation
        return user_id
```

``` python
class PostgresUserRepository(UserRepository):

    def find_by_id(self, user_id):
        # PostgreSQL implementation
        return user_id
```

Both implementations should honor the same expected behavior.

------------------------------------------------------------------------

# 4. I --- Interface Segregation Principle

## Definition

> Clients should not be forced to depend on methods they do not use.

Prefer multiple small, focused interfaces over one huge interface.

## Bad example

``` ts
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}
```

A robot would be forced to implement irrelevant methods:

``` ts
class Robot implements Worker {

  work() {
    console.log("Working");
  }

  eat() {
    throw new Error("Robot doesn't eat");
  }

  sleep() {
    throw new Error("Robot doesn't sleep");
  }
}
```

This is a design smell.

## Better design

Split the interface:

``` ts
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}
```

Human:

``` ts
class Human implements Workable, Eatable, Sleepable {

  work() {}

  eat() {}

  sleep() {}
}
```

Robot:

``` ts
class Robot implements Workable {

  work() {
    console.log("Robot working");
  }
}
```

The robot only implements what it actually supports.

## Python

Python can use `Protocol` for small structural interfaces:

``` python
from typing import Protocol


class Workable(Protocol):

    def work(self) -> None:
        ...
```

``` python
class Robot:

    def work(self):
        print("Robot working")
```

Python's structural typing makes `Protocol` particularly useful for this
style.

------------------------------------------------------------------------

# 5. D --- Dependency Inversion Principle

## Definition

> High-level modules should not depend directly on low-level concrete
> implementations. Both should depend on abstractions.

This principle is especially important in backend architecture.

## Bad design

``` python
class MongoUserRepository:

    def save(self, user):
        print("MongoDB")


class UserService:

    def __init__(self):
        self.repository = MongoUserRepository()

    def create_user(self, user):
        self.repository.save(user)
```

`UserService` is tightly coupled to MongoDB.

Changing to PostgreSQL means changing `UserService`.

## Better design

Define an abstraction:

``` python
from abc import ABC, abstractmethod


class UserRepository(ABC):

    @abstractmethod
    def save(self, user):
        pass
```

MongoDB:

``` python
class MongoUserRepository(UserRepository):

    def save(self, user):
        print("Saving to MongoDB")
```

PostgreSQL:

``` python
class PostgresUserRepository(UserRepository):

    def save(self, user):
        print("Saving to PostgreSQL")
```

The service depends on the abstraction:

``` python
class UserService:

    def __init__(self, repository: UserRepository):
        self.repository = repository

    def create_user(self, user):
        self.repository.save(user)
```

Now:

``` python
service = UserService(
    MongoUserRepository()
)
```

or:

``` python
service = UserService(
    PostgresUserRepository()
)
```

`UserService` does not need to know which database implementation is
being used.

## TypeScript

``` ts
interface UserRepository {
  save(user: User): void;
}
```

``` ts
class MongoUserRepository implements UserRepository {
  save(user: User) {
    console.log("MongoDB");
  }
}
```

``` ts
class PostgresUserRepository implements UserRepository {
  save(user: User) {
    console.log("PostgreSQL");
  }
}
```

``` ts
class UserService {

  constructor(
    private repository: UserRepository
  ) {}

  createUser(user: User) {
    this.repository.save(user);
  }
}
```

This is also where **Dependency Injection** becomes useful.

------------------------------------------------------------------------

# SOLID in a Real E-Commerce Application

A poorly designed application might have:

``` text
OrderService
│
├── Validate Order
├── Calculate Price
├── Save MongoDB
├── Stripe Payment
├── Send Email
├── Send SMS
└── Generate Invoice
```

One class has too many responsibilities and dependencies.

A more SOLID-oriented design can look like:

``` text
OrderService
│
├── OrderRepository
├── PaymentGateway
├── NotificationService
└── InvoiceService
```

Define focused abstractions:

``` ts
interface OrderRepository {
  save(order: Order): Promise<void>;
}

interface PaymentGateway {
  pay(amount: number): Promise<void>;
}

interface NotificationService {
  send(message: string): Promise<void>;
}
```

Implement infrastructure separately:

``` ts
class MongoOrderRepository implements OrderRepository {
  async save(order: Order) {
    // MongoDB
  }
}
```

``` ts
class StripePaymentGateway implements PaymentGateway {
  async pay(amount: number) {
    // Stripe
  }
}
```

``` ts
class EmailNotificationService implements NotificationService {
  async send(message: string) {
    // Email
  }
}
```

The application service:

``` ts
class OrderService {

  constructor(
    private orderRepository: OrderRepository,
    private paymentGateway: PaymentGateway,
    private notificationService: NotificationService
  ) {}

  async createOrder(order: Order) {

    await this.paymentGateway.pay(order.total);

    await this.orderRepository.save(order);

    await this.notificationService.send(
      "Order created successfully"
    );
  }
}
```

This structure provides:

-   SRP → responsibilities are separated
-   OCP → new implementations can be added
-   LSP → implementations follow their contracts
-   ISP → interfaces are focused
-   DIP → high-level code depends on abstractions

------------------------------------------------------------------------

# SOLID and Testing

One major benefit of SOLID is **testability**.

For example:

``` ts
class FakePayment implements PaymentGateway {

  async pay(amount: number) {
    console.log("Fake payment");
  }
}
```

A test can use:

``` ts
const payment = new FakePayment();

const service = new OrderService(
  repository,
  payment,
  notification
);
```

Instead of calling the real payment provider:

``` text
Production:

OrderService
     ↓
StripePayment


Test:

OrderService
     ↓
FakePayment
```

This is a direct practical benefit of **Dependency Inversion +
Dependency Injection**.

------------------------------------------------------------------------

# Abstract Class vs Implements

In TypeScript, `abstract` and `implements` solve related but different
problems.

## Quick comparison

  -----------------------------------------------------------------------
  Feature                 `abstract class`        `implements`
  ----------------------- ----------------------- -----------------------
  Main purpose            Base class + contract   Contract checking

  Can contain             Yes                     The implementing class
  implementation?                                 provides it

  Can contain fields?     Yes                     Interface describes
                                                  fields

  Can instantiate         No                      Depends on the class
  directly?                                       

  Multiple inheritance?   Only one class can be   Multiple interfaces can
                          extended                be implemented

  Shared behavior         Excellent               Not provided by the
                                                  interface

  Typical use             Shared base behavior    Loose contracts /
                                                  capabilities
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Abstract Class

An abstract class can contain both implemented methods and abstract
methods.

``` ts
abstract class Animal {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Shared implementation
  sleep() {
    console.log("Sleeping...");
  }

  // Contract
  abstract makeSound(): void;
}
```

Child class:

``` ts
class Dog extends Animal {

  makeSound() {
    console.log("Woof!");
  }
}
```

Usage:

``` ts
const dog = new Dog("Max");

dog.sleep();
dog.makeSound();
```

But:

``` ts
const animal = new Animal("Animal");
// Error: Cannot create an instance of an abstract class
```

## When abstract classes are useful

Use an abstract class when related classes share:

-   Common state
-   Common methods
-   Common implementation
-   A common contract

For example:

``` text
PaymentGateway
      │
      ├── StripeGateway
      └── PayPalGateway
```

If both gateways share meaningful implementation, an abstract base class
may make sense.

------------------------------------------------------------------------

# `implements`

`implements` means:

> This class promises to satisfy this interface.

``` ts
interface Payment {
  pay(amount: number): void;
}
```

Implementation:

``` ts
class StripePayment implements Payment {

  pay(amount: number) {
    console.log(`Stripe: ${amount}`);
  }
}
```

If the method is missing:

``` ts
class StripePayment implements Payment {
  // Error:
  // Property 'pay' is missing
}
```

The interface defines the contract; the class provides the
implementation.

------------------------------------------------------------------------

# Multiple Interfaces

A class can implement multiple interfaces:

``` ts
interface Payable {
  pay(): void;
}

interface Refundable {
  refund(): void;
}

class StripePayment implements Payable, Refundable {

  pay() {
    console.log("pay");
  }

  refund() {
    console.log("refund");
  }
}
```

But TypeScript does not support multiple class inheritance:

``` ts
class StripePayment
  extends PaymentGateway, AnotherGateway {
}
```

This is invalid.

------------------------------------------------------------------------

# Interface vs Abstract Class

A useful rule:

## Use `interface` when you need a contract

``` ts
interface UserRepository {
  findById(id: string): Promise<User>;
  save(user: User): Promise<void>;
}
```

Implementations:

``` ts
class PostgresUserRepository implements UserRepository {}

class MongoUserRepository implements UserRepository {}
```

This is particularly useful for:

-   Dependency Inversion
-   Dependency Injection
-   Repository abstractions
-   External service contracts
-   Testing/mocking
-   Loose coupling

## Use `abstract class` when you need shared behavior

``` ts
abstract class Logger {

  log(message: string) {
    console.log(`[LOG] ${message}`);
  }

  abstract save(message: string): void;
}
```

Child:

``` ts
class FileLogger extends Logger {

  save(message: string) {
    // Save to file
  }
}
```

The child receives the shared `log()` implementation while implementing
`save()`.

------------------------------------------------------------------------

# SOLID vs Design Patterns

Do not confuse SOLID principles with Design Patterns.

## SOLID

SOLID is a set of **design principles**:

``` text
SOLID
│
├── SRP
├── OCP
├── LSP
├── ISP
└── DIP
```

## Design Patterns

Design patterns are reusable solutions to recurring design problems:

``` text
Design Patterns
│
├── Factory
├── Strategy
├── Adapter
├── Observer
├── Repository
├── Singleton
└── Decorator
```

For example, the **Strategy Pattern** is often useful when implementing
OCP:

``` text
PaymentStrategy
├── StripePayment
├── PayPalPayment
└── ApplePayPayment
```

------------------------------------------------------------------------

# Quick Cheat Sheet

## S --- Single Responsibility

Ask:

> Does this class have multiple unrelated reasons to change?

If yes, consider splitting it.

``` text
Order ≠ Payment ≠ Email ≠ Database
```

------------------------------------------------------------------------

## O --- Open/Closed

Ask:

> If I add a new behavior, do I have to modify a large existing
> `if/else` or `switch`?

Prefer:

``` text
Payment
├── Stripe
├── PayPal
└── ApplePay
```

over:

``` text
PaymentService
├── if Stripe
├── if PayPal
└── if ApplePay
```

------------------------------------------------------------------------

## L --- Liskov Substitution

Ask:

> Can every implementation really honor the contract of its
> parent/abstraction?

If replacing the parent with the child causes unexpected errors, the
abstraction may be wrong.

------------------------------------------------------------------------

## I --- Interface Segregation

Ask:

> Is this class implementing methods it doesn't actually need?

Prefer:

``` text
Workable
Eatable
Sleepable
```

over one huge:

``` text
Worker
```

------------------------------------------------------------------------

## D --- Dependency Inversion

Ask:

> Does my business logic directly depend on MongoDB, PostgreSQL, Stripe,
> SendGrid, etc.?

Prefer:

``` text
Application Service
       ↓
   Abstraction
       ↑
Infrastructure
```

instead of:

``` text
Application Service
       ↓
    MongoDB
```

------------------------------------------------------------------------

# Final Mental Model

The most useful way to remember SOLID is:

``` text
S → Separate responsibilities

O → Add behavior without constantly modifying old code

L → Subtypes must respect their contracts

I → Keep interfaces small

D → Depend on abstractions
```

And for TypeScript:

``` text
interface
   │
   │ implements
   ↓
class
```

means:

> "I promise to follow this contract."

While:

``` text
abstract class
       │
       │ extends
       ↓
     class
```

means:

> "I inherit a base class that can provide shared behavior and define
> required behavior."

------------------------------------------------------------------------

# Practical Learning Path

For a developer working with TypeScript/NestJS, a good progression is:

``` text
OOP Fundamentals
      ↓
Interfaces / Abstract Classes
      ↓
SOLID
      ↓
Dependency Injection
      ↓
Repository Pattern
      ↓
Strategy Pattern
      ↓
Factory Pattern
      ↓
Clean Architecture
      ↓
Hexagonal Architecture
```

Do not try to apply every SOLID principle everywhere. SOLID is a set of
design heuristics, not a requirement to maximize the number of
interfaces and classes.

The goal is **low coupling, high cohesion, maintainability,
extensibility, and testability**.
