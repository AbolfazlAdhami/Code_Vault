package main

import "fmt"

func main() {
	str1 := "this first string"
	str2 := "this second string"
	str3 := "this third string"

	aNumber := 1

	fmt.Println(str1, str2, str3)

	stringLength, err := fmt.Println("The length of the first string is:", len(str1))
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("String length:", stringLength)
	}
	fmt.Printf("Value of number: %v\n", aNumber)
	fmt.Printf("Data Type: %T\n", aNumber)
}
