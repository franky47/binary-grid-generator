# Binary Grid Generator

This is a simple web application generating square binary matrices, as a support
for an experiment in [Penelope Buckley](https://penelopebuckley.com)'s thesis in experimental economics.

The back-end is a Node.js function hosted on [webtask.io](https://webtask.io),
which generates the data according to a number of parameters
(size, number of samples, probability distributions...).

The web front-end is a React application presenting the controls and the results.
