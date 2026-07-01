package main

import "fmt"

func main() {
	var colors [3]string
	colors[0] = "red"
	colors[1] = "black"
	colors[2] = "blue"

	fmt.Println(colors)
	fmt.Println(colors[1])

	numbers := [5]int{1, 2, 3, 4, 5}
	fmt.Println(numbers)

	fmt.Println("Number of colors:", len(colors))
	fmt.Println("Number of Numbers:", len(numbers))
}
