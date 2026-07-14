import "./style.css";

// Gets a list of bunny names
const bunnyNames = [
  "Sir Hopsalot",
  "Bunjamin",
  "Fluffernugget",
  "Professor Wiggles",
  "Biscuit",
  "Mochi",
  "Waffles",
  "Captain Carrot",
  "Bean",
  "Nibbles McGee",
  "Hoptimus Prime",
  "Binky Bonkers",
  "Cottonball",
  "Cheddar",
  "Pickles",
  "Lord Floofington III",
  "Bunzilla",
  "Marshmallow",
  "Crumpet",
  "Zoomie",
  "Snoot",
  "Pancake",
  "Tater Tot",
  "Dust Bunny",
  "Cinnabun",
];

// Generates a random integer from a max range
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

//Fetches from the rabbit API to give me an url to an image, the breed of the bunny in the image
async function newRabbit() {
  const url =
    "https://corsproxy.io/?url=https://rabbit-api-two.vercel.app/api/random";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

//Selects the html elements that will take the bunny data
const bunnyImg = document.querySelector('[data-image="bunny-image"]');
const bunnyNms = document.querySelector('[data-name="bunny-name"]');
const bunnyBreed = document.querySelector('[data-breed="bunny-breed"]');
const bunnyButton = document.querySelector('[data-action="new-bunny"]');

async function renderNewBunny() {
  const bunny = await newRabbit();

  if (bunny) {
    bunnyImg.src = bunny.url;
    bunnyNms.innerHTML = bunnyNames[randomInt(24)];
    bunnyBreed.innerHTML = bunny.breed;
  }
}
renderNewBunny();
