// get a second parameter's type of function
type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never

// example
type F = typeof Array['prototype']['slice']
type A = SecondArg<F>
