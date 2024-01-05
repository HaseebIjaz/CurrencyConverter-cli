import inquirer, { Question, QuestionCollection } from "inquirer";

type CurrencySymbol = "PKR" | "USD" | "GBP" | "ETH";
type ConversionObjType = { [X in CurrencySymbol] : { [Y in CurrencySymbol] : number } }//A mapped object type

interface CurrencyAnswer { 
    "name": string,
    "to": CurrencySymbol,
    "from": CurrencySymbol,
    "amount": string,
}

const conversions: ConversionObjType = {
    "PKR":{
        "USD": 0.0035,
        "GBP": 0.0028,
        "ETH": 0.0000022,
        "PKR": 1
    },
    "USD":{
        "PKR": 287.22,
        "GBP": 0.82,
        "ETH": 0.00063,
        "USD": 1
    },
    "GBP":{
        "USD": 1.22,
        "PKR": 351.53,
        "ETH": 0.00077,
        "GBP": 1
    },
    "ETH":{
        "USD": 1593.06,
        "PKR": 457564.91,
        "GBP": 1301.63,
        "ETH": 1
    }
} 
const currencies = ["PKR","USD","GBP","ETH"];

const currencyConverter = async () => {
    const questions:QuestionCollection = [
        {
            name: "name",
            message: "What's your name ? ",
            type: "input",
            default: "Ali"
        },
        {
            name: "from",
            message: "Which currency to convert from ? ",
            type: "list",
            choices:currencies
        },
        {
            name: "to",
            message: "Which Currency to convert to ? ",
            type: "list",
            choices:currencies,
        },
        {
            name: "amount",
            message: "What amount ? ",
            type: "input",
            default: 100
        }
    ];

    const answers:CurrencyAnswer = await inquirer.prompt(questions);
    const from:CurrencySymbol = answers["from"];
    const to:CurrencySymbol = answers["to"];
    const amount:number = parseInt(answers["amount"]);
    const multiplicationFactor = conversions[from][to];
    console.log(`You get ${multiplicationFactor * amount} ${to}`);
}

currencyConverter();