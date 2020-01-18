class Cat {
  constractur(name) {
    this.name = name;
  }

  mewo() {
    console.log('Mewoooo');
  }

}

const cat = new Cat('Tom');
cat.mewo()

Cat.prototype.sayHello = function () {
  console.log('Hello my name is ', this.name);
}
cat.sayHello();
