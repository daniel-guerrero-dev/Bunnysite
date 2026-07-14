import "./style.css";

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

let bunny = await newRabbit();

const bunnyImg = document.querySelector('[data-image="bunny-image"]');

bunnyImg.src = bunny.url;
