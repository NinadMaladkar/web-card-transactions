# TASK-101 Cards and Transactions Overview

Hellow there!😁 first of all, thanks for taking the time and your interest in joining Code Factory!
As part of joining our engineering, we share this simple challenge with you.

Happy coding!

The purpose of this task is to build a card and transactions overview page. The user should be able to select one of the cards, see it's transactions and be able to filter the transactions based on the amount.

Please install dependencies using `yarn`.

Typescript is a must.

We provided a fake ApiClient for you that fetches the data. If you want to improve this client and adjust it to your needs feel free to do so.

You can always extend with more data if you feel like it.

If you feel like the design does not make sense, adjust it and note how you would communicate your suggestions with a designer.

## Web Card Transactions

### [Click here to see the Video Review]([LINK_TO_LOOM_VIDEO])

## Proposed Solution

- Setup the project using Vite with Vue 3, TypeScript and Vuex
- Used Vuex store for storing states of transactions and selected card, filtering transactions
- Built UI components based on the design given and added some extra features like:
  - Filtering transactions by amount and description
  - Extra transactions data for testing purposes
  - Pagination for transactions
  - Debouncing for filtering transactions
  - Mobile view styling
- Added unit tests using Vitest for components and store functionality, added checks for code coverage
- Checked for performance using Lighthouse and made it accessible
- Prepared and deployed the project using Netlify

### [Click here to see the Live Demo](https://webcardtransactions.netlify.app/)

## Screenshots

#### Live Demo
<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/user-attachments/assets/a721f4bc-c825-406e-b31d-9ed558110187" alt="Live-demo-1" style="width: 48%;"/>
  <img src="https://github.com/user-attachments/assets/acf2156f-faff-416c-a9c2-b98768f29ad8" alt="Live-demo-2" style="width: 48%;"/>
</div>

#### Initial TLDraw Design
![TLDraw design](https://github.com/user-attachments/assets/9411c1a8-b971-4e38-ac63-8da85bec52d2)

#### Test Coverage
![test coverage](https://github.com/user-attachments/assets/085e918d-d823-4515-b97b-d6161c06d2b4)

#### Lighthouse Report
![lighthouse performance report](https://github.com/user-attachments/assets/b8fdd5fb-2b5e-4272-a1c2-fdb9bd35ef43)



## Design Suggestions/Thoughts

- Add a loading state for the transactions (maybe a skeleton loader)
- Add a tooltip for the filter input
- Better styling for arranging the cards. If there are more than 2 cards, how are they supposed to be displayed?
- Mobile view styling design would be a good to have

## Libraries / Tools Used

- Vue.js
- TypeScript
- Vite for project setup
- Vuex for state management
- Vitest for unit testing
- Netlify for deployment

## Setup

To install the dependencies run:

`yarn`

And to run the app:

`yarn dev`

## Running the tests

You can run the unit tests using:

`yarn test`

## Running the tests with coverage

`yarn test:coverage`

## Future Work

1. Improve styling and responsive design
2. Complete test coverage to achieve more than 90%
3. Add end to end tests using cypress or similar
4. Add linting and formatting tools and checks

## Acceptance Criteria

- User can select one of the cards
- The transactions of the selected card will be displayed.
- The transactions have a same background color than the card.
- There should be a filter field between the cards and the transactions.
- The user can filter transactions by inputting amount to the filter fields. Transactions with the amount in the fields or greater should be left visible.
- If the user changes a selected card and there is content in the filter fields, the content should be resetted.
