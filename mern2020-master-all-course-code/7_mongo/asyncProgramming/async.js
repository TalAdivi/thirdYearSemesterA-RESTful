const promiseMsg = () => new Promise((resolve, reject) => {
  const error = false;

  if (!error)
    return setTimeout(() => resolve('Message: 🤡'), 2000); // Message: 🤡 <-- after 2 seconds

  return reject(new Error('Message: 👿'));
});
const clown = async () => {
  console.log('Before: 🤡');

  try {
    console.log(await promiseMsg());
  } catch (err) {
    console.log(err);
  }

  console.log('After: 🤡');
};

clown();
