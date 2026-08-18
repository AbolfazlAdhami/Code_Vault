# Python
from abc import ABC, abstractmethod


# class Worker(ABC):
#     @abstractmethod
#     def work(self): pass
#     @abstractmethod
#     def eat(self): pass
#     @abstractmethod
#     def sleep(self): pass


# class Robot(Worker):  # Robots don't eat or sleep
#     def work(self): print("Working")
#     def eat(self): pass          # Forced empty implementation
#     def sleep(self): pass



class Workable(ABC):
    @abstractmethod
    def work(self): pass


class Eatable(ABC):
    @abstractmethod
    def eat(self): pass


class Sleepable(ABC):
    @abstractmethod
    def sleep(self): pass


class Human(Workable, Eatable, Sleepable):
    def work(self): print("Working")
    def eat(self): print("Eating")
    def sleep(self): print("Sleeping")


class Robot(Workable):
    def work(self): print("Working")
