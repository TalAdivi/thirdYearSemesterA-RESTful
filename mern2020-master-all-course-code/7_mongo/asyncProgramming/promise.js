console.log('Before: 🤡');

const promiseMsg = () => new Promise((resolve, reject) => {
  const error = true;

  if (!error)
    return setTimeout(() => resolve('Message: 🤡'), 2000); // Message: 🤡 <-- after 2 seconds

  return reject(new Error('Message: 👿'));
});

promiseMsg()
  .then(msg => console.log(msg))
  .catch(err => console.log(err));

console.log('After: 🤡');
