const pizzaSizes = ['slice', 'half-pie', 'full-pie'];
const [_slice, halfPie, _fullPie] = pizzaSizes;
const [slice, , fullPie = '*fullPie*'] = pizzaSizes;
console.log(fullPie);

const myObj = {
    data: [
        {
            name: 'Maurine',
            email: 'mrath@edison.info',
        }, {
            name: 'Giuseppe',
            email: 'gjacobs@everardo.name',
        }
    ]
};
const { data } = myObj;
/* Deep destruction + rename: */
const { data: { 0: { email } } } = myObj;
const { success: status } = myObj;

const conference = {
    destination: 'Rone Conference',
    travelers: 2,
    field: "web engineering 2017",
    cost: 550,
};

function getConfDetails({destination, field}) {
    return `I will attend the ${destination} on ${field}`;
}
console.log(getConfDetails(conference))
