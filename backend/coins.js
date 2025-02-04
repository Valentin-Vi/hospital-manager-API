const readline = require('readline');

// Define the coin denominations in cents
const COINS = [50, 25, 10, 5, 1];

// Function to calculate the change in coins
function calculateChange(amount) {
    let remainingCoins = Math.round((amount - Math.floor(amount)) * 100);
    const change = {};

    // Iterate through each coin denomination
    for (const coin of COINS) {
        if (remainingCoins >= coin) {
            change[coin] = Math.floor(remainingCoins / coin);
            remainingCoins %= coin;
        } else {
            change[coin] = 0;
        }
    }

    return change;
}

// Function to display the change
function displayChange(change) {
    console.log("The change is:");
    for (const [coin, count] of Object.entries(change)) {
        console.log(`${coin} cent coins: ${count}`);
    }
}

// Main function to handle user input and process the change
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter the amount to pay: ", (input) => {
        const amount = parseFloat(input);

        if (!isNaN(amount)) {
            const change = calculateChange(amount);
            displayChange(change);
        } else {
            console.log("Invalid input.");
        }

        rl.close();
    });
}

// Run the main function
main();