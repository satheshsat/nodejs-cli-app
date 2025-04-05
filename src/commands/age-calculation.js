import inquirer from "inquirer";



export const ageCalc = () => {
    inquirer
    .prompt([
      {
        type: "input",
        name: "dob",
        message: "What's your DOB? (YYYY-MM-DD)",
        validate: function(dob)
        {
            // Regex mail check (return true if valid mail)
            return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(dob) || "Please enter a valid date in YYYY-MM-DD format";
        }
      },
    ])
    .then((answers) => {
      // console.log(chalk.green(`Hey there, ${answers.dob}!`));
      const birthDate = new Date(answers.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      console.log(`Your age is: ${age}`);
    });
  }