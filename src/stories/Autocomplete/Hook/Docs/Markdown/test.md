### events

> Events to call to trigger constructor events and quiz actions.

  ```jsx
  const { events } = useCioQuiz(args);
  ```

  | property          | type                 | description|
  | :-----------------| ---------------------| :--------- |
  | nextQuestion      | `function() => void` | Action event to go to the next question in the quiz |
  | previousQuestion  | `function() => void` | Action event to go to the previous question in the quiz |
  | resetQuiz         | `function() => void` | Action event to go to the reset the quiz state and go to the first question |
  | resultClick       | `function(item) => void (item* is the quiz result data)` | Action event to trigger quiz result click events |
  | addToCart         | `function(e: React.MouseEvent<HTMLElement>, item, price) => void` | Action event to trigger add to cart click events |
  | addToFavorites    | `function(e: React.MouseEvent<HTMLElement>, item, price) => void` | Action event trigger add to favorites click events |
  | hydrateQuiz       | `function() => void` | Action event to hydrate the quiz with saved state in session storage on reload |
  | quizAnswerChanged | `function(payload: string \| string[] ) => void` | Action event to trigger add to cart click events |
