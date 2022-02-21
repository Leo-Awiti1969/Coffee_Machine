function sum(numbers) {
    let sumNumbers = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] !== 0) {
            sumNumbers = sumNumbers + numbers[i];
        } else {
            break;
        }
    }
    return sumNumbers;
}
