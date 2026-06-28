package main

import (
	"fmt"
	"math"
)

func main() {
	f1, f2, f3 := 23.5, 65.1, 76.3

	sum := f1 + f2 + f3

	fmt.Println("Float Sum:", sum)

	sum = math.Round(sum*100) / 100
	fmt.Printf("The sum is now %v\n\n", sum)

	fmt.Printf("The value if PI is %v\n\n", math.Pi)

	circleRadius := 15.5
	circumference := circleRadius * 2 * math.Pi
	fmt.Printf("Circumference: %.f\n", circumference)
}
