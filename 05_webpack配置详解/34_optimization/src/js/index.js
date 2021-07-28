import('./a.js').then(({add, cout}) => {
    console.log(add(1, 2));
    console.log(cout(3, 2));
})