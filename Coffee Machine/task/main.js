// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

/** set original quantities of various items **/
let waterBal = 400;
let milkBal = 540;
let beansBal = 120;
let cupsBal = 9;
let cashBal = 550;

/** user interface loop **/
while (true) {

/** ask the user for action **/
    let userAction = input("\nwrite action (buy, fill, take, remaining, exit)\n");

/** process the user's action and print resulting final message **/
    if (userAction === "exit") {
        break;
    } else if (userAction === "buy") {

/** user message for to buy option **/
        let userBuyOption = input("\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, " +
    "back - to main menu:\n");

 /** ask user for number of cups**/
        if (userBuyOption === "back") {

        } else if (userBuyOption === "1") {
            let numOfCups = input("\nHow many cups of Espresso do you want to buy?\n");
            processCoffeeOrder(userBuyOption, numOfCups);
        } else if (userBuyOption === "2") {
            let numOfCups = input("\nHow many cups of Latte do you want to buy?\n");
            processCoffeeOrder(userBuyOption, numOfCups);
        } else if (userBuyOption === "3")  {
            let numOfCups = input("\nHow many cups of Cappuccino do you want to buy?\n");
            processCoffeeOrder(userBuyOption, numOfCups);
        } else {
            console.log("Only enter (1, 2, 3 or write 'back')")
        }

 /**  user action to fill processing **/
    } else if (userAction === "fill") {
        waterBal+= Number(input("\nWrite how many ml of water you want to add:\n"))
        milkBal+=  Number(input("Write how many ml of milk you want to add:\n"))
        beansBal+= Number(input("Write how many grams of coffee beans you want to add:\n"))
        cupsBal+= Number(input("Write how many disposable coffee cups you want to add:\n"))

/** user action to buy processing **/
    } else if (userAction === "take") {
        console.log(`I give you $${cashBal}\n`)
        cashBal = 0;

/** print the remaining balances of the various items **/
    } else if (userAction === "remaining") {
        printBals()
    }
}

/** to print the remaining quantities message to the user **/
function printBals() {
    console.log(`\nThe coffee machine has:\n` +
        `${waterBal} ml of water\n` +
        `${milkBal} ml of milk\n` +
        `${beansBal} g of coffee beans\n` +
        `${cupsBal} disposable cups\n` +
        `$${cashBal} of money`);
}

/** processing buy coffee orders **/
function processCoffeeOrder(coffeeType, numOfCups) {
    if (coffeeType === "1") {
        waterBal-= 250 * numOfCups;
        beansBal-= 16 * numOfCups;
        cupsBal-= 1 * numOfCups;
        cashBal+= 4 * numOfCups;

/** processing purchase of Latte **/
    } else if (coffeeType === "2") {
        waterBal-= 350 * numOfCups;
        milkBal-= 75 * numOfCups;
        beansBal-= 20 * numOfCups;
        cupsBal-= 1 * numOfCups;
        cashBal+= 7 * numOfCups;

/** processing purchase of Cappuccino **/
    } else if (coffeeType === "3") {
        waterBal-= 200 * numOfCups;
        milkBal-= 100 * numOfCups;
        beansBal-= 12 * numOfCups;
        cupsBal-= 1 * numOfCups;
        cashBal+= 6;
    }
    if (0 > (waterBal || milkBal || beansBal || cupsBal)) {
        checkLessIngredient(waterBal, milkBal, beansBal, cupsBal, coffeeType, numOfCups);
    } else {
        printYesBuy()
    }
}

/** process the insufficient ingredient and inform user **/
function checkLessIngredient(waterBal, milkBal, beansBal, cupsBal, coffeeType, numOfCups) {
    let ingredient = "";
    if (waterBal < 0) {
        ingredient = "water";
    } else if (milkBal < 0) {
        ingredient = "milk";
    } else if (beansBal < 0) {
        ingredient = "beans";
    } else if (cupsBal < 0) {
        ingredient = "cups";
    } else {
    }
    reversalIngredientBals(ingredient, coffeeType, numOfCups);
}

/** due to lesser ingredients - reverse purchase of coffee **/
function reversalIngredientBals(ingredient, coffeeType, numOfCups) {
    if (coffeeType === "1") {
        waterBal += 250 * numOfCups;
        beansBal += 16 * numOfCups;
        cashBal -= 4 * numOfCups;
    } else if (coffeeType === "2") {
        waterBal += 350 * numOfCups;
        milkBal += 75 * numOfCups;
        beansBal += 20 * numOfCups;
        cashBal -= 7 * numOfCups;
    } else if (coffeeType === "3") {
        waterBal += 200 * numOfCups;
        milkBal += 100 * numOfCups;
        beansBal += 12 * numOfCups;
        cashBal -= 6 * numOfCups;
    } else {
    }
    cupsBal += 1 * numOfCups;
    lesserNumberOfCups(waterBal, milkBal, beansBal, cupsBal, ingredient, coffeeType, numOfCups);
}

/** calculate the alternative number of cups lesser than demanded **/
function lesserNumberOfCups(waterBal, milkBal, beansBal, cupsBal, ingredient, coffeeType, numOfCups) {
    let numberOfCupsWater = 0;
    let numberOfCupsMilk = 0;
    let numberOfCupsBeans = 0;
    let numberOfCups = 0;

    if (coffeeType === "1") {
        numberOfCupsWater = numberOfCupsWater + Math.floor(waterBal / (250));
        numberOfCupsBeans = numberOfCupsBeans + Math.floor(beansBal / (16));
    } else if (coffeeType === "2") {
        numberOfCupsWater = numberOfCupsWater + Math.floor(waterBal / (350));
        numberOfCupsMilk = numberOfCupsMilk + Math.floor(milkBal / (75));
        numberOfCupsBeans = numberOfCupsBeans + Math.floor(beansBal / (20));
    } else if (coffeeType === "3") {
        numberOfCupsWater = numberOfCupsWater + Math.floor(waterBal / (200));
        numberOfCupsMilk = numberOfCupsBeans + Math.floor(milkBal / (100));
        numberOfCupsBeans = numberOfCupsBeans + Math.floor(beansBal / (12));
    } else {
    }
    numberOfCups = numberOfCups + Math.floor(cupsBal / 1);
    let alternativeNumOfCups = Math.min(numberOfCupsWater, numberOfCupsMilk, numberOfCupsBeans, numberOfCups);
    if (alternativeNumOfCups < numOfCups && alternativeNumOfCups > 0) {
        doYouAcceptLessCups(ingredient, coffeeType, alternativeNumOfCups, numOfCups);
    } else {
        console.log(`\nSorry, not enough ${ingredient}!`);
    }
}

/** ask user to confirm weather lesser number of cups is fine **/
function doYouAcceptLessCups(ingredient, coffeeType, alternativeNumOfCups, numOfCups) {
    let confirmationForLess = "";
    if (alternativeNumOfCups === 1) {
        confirmationForLess = input(`\nI can not make ${numOfCups} cups of coffee however, can I offer you ` +
            `${alternativeNumOfCups} cup of coffee instead?, please confirm ( Yes / No )\n`);
    } else {
        confirmationForLess = input(`\nI can not make ${numOfCups} cups of coffee however, can I offer you ` +
            `${alternativeNumOfCups} cups of coffee instead?. Please confirm ( Yes / No )\n`);
    }
    if (confirmationForLess === 'Yes') {
        processCoffeeOrder(coffeeType, alternativeNumOfCups);
    } else if (confirmationForLess === 'No') {
        console.log(`\nSorry, not enough ${ingredient}!`);
        }
}

/** inform user that the purchase is a success **/
function printYesBuy() {
    console.log("\nI have enough resources, making your coffee order!");
}
