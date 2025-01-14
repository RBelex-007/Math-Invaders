// src/utils/mathProblem.js
export function generateMathProblem() {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2, question, answer;

    switch (operator) {
        case '+':
            num1 = Phaser.Math.Between(1, 20);
            num2 = Phaser.Math.Between(1, 20);
            answer = num1 + num2;
            question = `What is ${num1} + ${num2}?`;
            break;
        case '-':
            num1 = Phaser.Math.Between(10, 30);
            num2 = Phaser.Math.Between(1, 10);
            answer = num1 - num2;
            question = `What is ${num1} - ${num2}?`;
            break;
        case '*':
            num1 = Phaser.Math.Between(1, 10);
            num2 = Phaser.Math.Between(1, 10);
            answer = num1 * num2;
            question = `What is ${num1} × ${num2}?`;
            break;
        case '/':
            num2 = Phaser.Math.Between(1, 10);
            answer = Phaser.Math.Between(1, 10);
            num1 = num2 * answer;
            question = `What is ${num1} ÷ ${num2}?`;
            break;
    }

    return { question, answer };
}
