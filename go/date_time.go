package main

import (
	"fmt"
	"time"
)

func main() {
	t1 := time.Date(2003, time.June, 29, 5, 31, 0, 0, time.Local)
	t2 := time.Date(2003, time.June, 29, 5, 31, 0, 0, time.UTC)
	fmt.Println(t1, t2)
	t := time.Date(2009, time.November, 10, 23, 0, 0, 0, time.UTC)
	fmt.Printf("Go launched at %s\n", t)

	n := time.Now()
	fmt.Printf("The time currently is %s\n", n)
	fmt.Printf("This object's type is %T\n", n)

	fmt.Printf(n.Format(time.ANSIC) + "\n")

	tomorrow := n.AddDate(0, 0, 1)
	fmt.Printf(tomorrow.Format(time.ANSIC) + "\n")

	// format := "Mon 2006-02-01"
	format := "Mon 02-01-2006"
	fmt.Printf(tomorrow.Format(format) + "\n")
}
