## Expense Master 3000
A simple web app created in React with Typescript to list expenses.

## How to run

Clone the repository and the [API](https://github.com/pleo-io/frontend-challenge)
Make sure the API is running on localhost:3000.

In the project directory, you can run:
`npm install`
`npm start`

## functionality
The app will list all the expenses in the api at start, the user can filter via the search field for expenses on:
`User name, first and last`
`Merchant name`
`Amount`
`Comments`

The user can upload image receipts to the API, and cycle through the images.

## known deficiencies
### Typescript implementation
The app is primarily written with Typescript, but the capabilities of Typescript is not fully utilized.

### Expenses do not show timestamps
The app is not using the timestamps provided in the API, the implementation of timestamps is left out completely.

### State management
A state management was left out, see section below for more information.

### HTML & CSS
The projects HTML and CSS(especially the CSS) is very unorganized.﻿

## Motivation
The project is my first project done in Typescript and the focus is to gain a better understanding of Typescript. The implementation of Typescript is inconsistent, do to the lack of knowledge and experience with Typescript. The implementation of Typescript has mainly on ensuring the functionality of the app is behaving as expected. To eliminate as much confusion on my end as possible, the amount of libraries and tools is kept as minimum as possible.

Overall, the project gave me a basic understand of working with Typescript, the limitations and advantages, although the implementation does not fully take advantages of Typescripts features.
