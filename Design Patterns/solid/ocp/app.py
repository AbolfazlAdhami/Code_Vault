# Python

from abc import ABC, abstractmethod


# class AreaCalculator:
#     def calculate(self, shape):
#         if shape["type"] == "circle":
#             return 3.14 * shape["radius"] ** 2
#         elif shape["type"] == "rectangle":
#             return shape["width"] * shape["height"]
#         # Adding a triangle requires modifying this method


class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass


class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return 3.14 * self.radius ** 2


class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height


class AreaCalculator:
    def calculate(self, shape: Shape) -> float:
        return shape.area()
