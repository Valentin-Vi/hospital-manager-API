const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the amount to pay: ", (input) => {
    const amount = parseFloat(input);

    if (!isNaN(amount)) {
        const amountCoins = Math.round((amount - Math.floor(amount)) * 100);

        let remainingCoins = amountCoins;

        const quarters = Math.floor(remainingCoins / 25);
        remainingCoins %= 25;

        const dimes = Math.floor(remainingCoins / 10);
        remainingCoins %= 10;

        const nickels = Math.floor(remainingCoins / 5);
        remainingCoins %= 5;

        const pennies = remainingCoins;

        console.log("The change is:");
        console.log("25 cent coins: " + quarters);
        console.log("10 cent coins: " + dimes);
        console.log("5 cent coins: " + nickels);
        console.log("1 cent coins: " + pennies);
    } else {
        console.log("Invalid input.");
    }

    rl.close();
});