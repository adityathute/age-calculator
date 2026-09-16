# Age Calculator

A simple and interactive **Age Calculator** built with React. Enter your date and time of birth to calculate your current age in real time and view your age in different time units.

## Features

* Calculate age from date and time of birth
* Display current age in years, months, days, hours, minutes, and seconds
* Display total age in:

  * Years
  * Months
  * Weeks
  * Days
  * Hours
  * Minutes
  * Seconds
* Live age updates every second
* Calculate the remaining time until the next birthday
* Validate future birth dates
* Responsive and simple user interface

## Technologies Used

* React 18
* React Router DOM
* JavaScript
* HTML
* CSS
* Create React App

## Project Structure

```text
age-calculator/
├── public/
├── src/
│   ├── components/
│   │   ├── AgeCalculator.js
│   │   └── AgeCalculator.css
│   ├── pages/
│   │   ├── Home.js
│   │   └── Home.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Requirements

Make sure you have the following installed:

* Node.js
* npm

You can verify the installations with:

```bash
node --version
npm --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/age-calculator.git
```

Go to the project directory:

```bash
cd age-calculator
```

Install the dependencies:

```bash
npm install
```

## Run the Project

Start the development server:

```bash
npm start
```

The application will open at:

```text
http://localhost:3000
```

If it does not open automatically, open the address manually in your browser.

## Build for Production

Create an optimized production build:

```bash
npm run build
```

The production files will be generated inside the `build` directory.

## Run Tests

Run the available tests with:

```bash
npm test
```

## How It Works

1. Enter your date of birth.
2. Enter your birth time if required.
3. The application calculates your current age.
4. The result updates automatically every second.
5. The application also calculates the remaining time until your next birthday.

## Available Scripts

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm start`     | Starts the development server             |
| `npm test`      | Runs the test suite                       |
| `npm run build` | Creates a production build                |
| `npm run eject` | Ejects the Create React App configuration |

## License

This project is available under the license included in the repository.
