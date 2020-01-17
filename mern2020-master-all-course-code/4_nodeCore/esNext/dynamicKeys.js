const key = 'name';
const genKey = k =>`index_${k*2}`;
const obj = {};

obj[key] = 'Jhon Doe';
obj[genKey(1)] = 21;
console.log(obj);

