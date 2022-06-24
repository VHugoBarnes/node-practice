# MonoThread: Design implications and security

## What happens when we run a script as simple as this:

```javascript
console.log("hello world");
```

1. A process starts that interprets the code, convert it to machine code   
2. Executes the code
3. Finishes the process

The problem with Javascript beign monothread is that when an error comes, it will most likely stop the process. That's why we need to be very careful about all of our variables, function parameter and everything that can fail.
