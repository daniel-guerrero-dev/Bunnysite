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
  "Tasha",
];

// Generates a random integer from a max range
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

//Fetches from the rabbit API to give me an url to an image, the breed of the bunny in the image
async function newRabbit() {
  const url = `https://corsproxy.io/?url=https://rabbit-api-two.vercel.app/api/random?t=${Date.now()}`;
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

async function renderNewBunny(forceNew = false) {
  const today = new Date().toDateString();
  const stored = localStorage.getItem("dailyBunny");

  if (!forceNew && stored) {
    const parsed = JSON.parse(stored);
    if (parsed.date === today) {
      bunnyImg.src = parsed.bunny.url;
      bunnyNms.innerHTML = parsed.name;
      bunnyBreed.innerHTML = parsed.bunny.breed;
      return;
    }
  }

  const bunny = await newRabbit();
  if (bunny) {
    const name = bunnyNames[randomInt(25)];

    // only save to localStorage on initial daily load, not on button press
    if (!forceNew) {
      localStorage.setItem(
        "dailyBunny",
        JSON.stringify({
          date: today,
          bunny: bunny,
          name: name,
        }),
      );
    }

    bunnyImg.src = bunny.url;
    bunnyNms.innerHTML = name;
    bunnyBreed.innerHTML = bunny.breed;
  }
}
renderNewBunny();

bunnyButton.addEventListener("click", () => renderNewBunny(true));

function updateCountdown() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diff = midnight - now;

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  const displayHours = String(h).padStart(2, "0");
  const displayMinutes = String(m).padStart(2, "0");
  const displaySeconds = String(s).padStart(2, "0");

  const timerElement = document.querySelector('[data-time="countdown"]');
  if (timerElement) {
    timerElement.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
  }
}
updateCountdown();

setInterval(updateCountdown, 1000);
