class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

// Get Coding :)

class Shark extends Animal {
  constructor(name , age, status) {
    super(name,age, 0,'shark', status);
  }
}

class Cat extends Animal {
  // Do the same here as you did for Shark - define your constructor function and any other methods you need
}

class Dog extends Animal {
  // On your own now - you can do it :D
}

var billy = new Shark("Billy", 3, "Alive and well");

console.log(billy);
console.log(billy.introduce());


const fn = 'alpha.beta.gamma.delta.txt';
console.log( fn.split('.').slice(0,-1).join('.'));