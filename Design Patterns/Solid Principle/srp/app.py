# Python

# class User:
#     def __init__(self, name: str, email: str):
#         self.name = name
#         self.email = email

#     def save_to_database(self):
#         # Database logic mixed with user data
#         print(f"Saving {self.name} to database")

#     def send_email(self, message: str):
#         # Email logic mixed in
#         print(f"Sending email to {self.email}: {message}")


class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email


class UserRepository:
    def save(self, user: User):
        print(f"Saving {user.name} to database")


class EmailService:
    def send(self, user: User, message: str):
        print(f"Sending email to {user.email}: {message}")
