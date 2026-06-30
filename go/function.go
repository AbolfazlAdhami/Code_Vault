package main

import "fmt"

func main() {
	mockFunction()
}

func mockFunction() {
	fmt.Println("Doing Something:")
	valu1 := 5
	valu2 := 10
	valu3 := 15
	sum, count, average := addAllValues(valu1, valu2, valu3)
	fmt.Printf("The sum is %v.\n", sum)
	fmt.Printf("The count is %v.\n", count)
	fmt.Printf("The average is %v.\n", average)
}

func addValues(v1, v2 int) int {
	return v1 + v2
}

func addAllValues(values ...int) (int, int, float64) {
	sum := 0
	for _, v := range values {
		sum += v
	}
	count := len(values)
	average := float64(sum) / float64(count)
	return sum, count, average
}
