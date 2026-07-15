# Bunnysite
It generates a random bunny each day together with its breed type, maintains memory of generated bunnies and lets you find more without losing your daily one.

## Technologies

It's a vanilla javascript project built on top of Vite, Tailwind CSS and vanilla HTML

## What I learned

I learnt how to handle API fetches, using async functions and handling the DOM.
Encountered CORS restrictions both in development (solved with a proxy) and in production (solved by building a Vercel serverless function that makes server-to-server requests, bypassing browser CORS entirely)

[Live demo](https://bunnysite.vercel.app/)
