# BGG Calibration Game

The calibration game is a way to measure how long it takes for people to count
the number of ones in a binary matrix of an arbitrary size.

The game will be presented as a fullscreen webapp showing a matrix, an input to
enter a number, and a chronometer that will start when the matrix is displayed
and stop when the user submits their answer.

Upon submission, the correct answer is revealed, and the data (matrix, time, result, user info)
can be sent to a backend for persistent storage and further analysis.

Chrono: https://github.com/fbarrailla/react-chronometer/blob/gh-pages/Chrono.js

## Game Flow

(AP) User clicks "start" button
  -> Display Matrix
  -> Start Chrono
... user counts the number of ones in their head
(AP) User inputs their answer
(AP) User submits answer (click "submit" or press enter)
  -> Stop Chrono
  -> Hide matrix ?
  -> Show correct answer
  -> Show "play again" button

(After last matrix, can there be a page where the user can write comments about the game?)
