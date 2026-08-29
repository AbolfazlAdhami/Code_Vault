# Python
from abc import ABC, abstractmethod


# class MySQLDatabase:
#     def connect(self):
#         print("Connected to MySQL")


# class UserService:
#     def __init__(self):
#         self.db = MySQLDatabase()

#     def get_users(self):
#         self.db.connect()


class Database(ABC):
    @abstractmethod
    def connect(self): pass


class MySQLDatabase(Database):
    def connect(self):
        print("Connected to MySQL")


class PostgreSQLDatabase(Database):
    def connect(self):
        print("Connected to PostgreSQL")


class UserService:
    def __init__(self, db: Database):  # Depends on abstraction
        self.db = db

    def get_users(self):
        self.db.connect()
