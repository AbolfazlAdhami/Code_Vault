# Python
from abc import ABC, abstractmethod

# class Bird:
#     def fly(self):
#         print("Flying")


# class Penguin(Bird):
#     def fly(self):
#         raise Exception("Penguins can't fly!")  # Breaks substitution


class Bird:
    @abstractmethod
    def move(self):
        pass


class FlyingBird(Bird):
    def move(self):
        print("Flying")


class Penguin(Bird):
    def move(self):
        print("Swimming / Walking")
