#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


// Initialize user balance and pin code
let myBalance = 5000;
let myPin =1234;

// Print welcome message
console.log(chalk.blue("\n \tWelcome to Anus-Shahid - ATM Machine\n"));


let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.green("Enter your pin code:")
    }
])
if (pinAnswer.pin === myPin){
    console.log(chalk.yellow("\nPin is Correct, Login Successfully!\n"));
    console.log(`Current Account Balance is ${myBalance}`)

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices:["Withdraw Ammount", "Check Balance"]
        }
    ])

    if(operationAns.operation === "Withdraw Ammount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawal method:",
                choices: ["Fast Cash", "Enter Ammount"]  
            }
        ])
        if(withdrawAns.withdrawMethod === "Fast Cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Ammount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ])
            if(fastCashAns.fastCash  > myBalance){
               console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -=fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash} withdraw Successfully`);
                console.log(`Your Remaining Balance is:${myBalance}`);
            }
        }
       else if(withdrawAns.withdrawMethod === "Enter Ammount"){ 
           let ammountAns = await inquirer.prompt([
               {
                   name: "ammount",
                   type: "number",
                   message: "Enter the ammount to withdraw:"
               }
        ])
        if(ammountAns.ammount > myBalance){
            console.log("Insufficient Balance");
        }        
        else{
            myBalance -= ammountAns.ammount;
            console.log(`${ammountAns.ammount} Withdraw Successfully`);
            console.log(`Your Remaining Balance is: ${myBalance}`)
        }



        }
    }
    else if (operationAns.operation === "Check Balance"){
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else{
    console.log(chalk.red("Pin is Incrrect, Try Again!"));
}