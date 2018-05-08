require("./styles.css")

const { guess } = require('guess-webpack/api');

exports.onInitialClientRender = () => window.addEventListener('keydown', highlight);

let colored = false;
const highlight = e => {
  if (e.keyCode !== 72) return;
  colored = !colored;
  if (colored) {
    colorLinks();
  } else {
    uncolorLinks();
  }
};

const colorLinks = () => {
  const guesses = guess(
    window.location.pathname.slice(-1) === `/` ? window.location.pathname.slice(0, -1) : window.location.pathname
  );
  [].slice.call(document.querySelectorAll(`a`)).forEach(n => n.classList.add('prefetch-priority-0'));
  let all = Object.keys(guesses).map(key => guesses[key]);
  all = all.filter((p, idx) => all.indexOf(p) === idx); //.sort((a, b) => a - b);
  Object.keys(guesses).forEach(c => {
    const probability = guesses[c];
    let totalBigger = 0;
    for (let i = 0; i < all.length; i += 1) {
      if (all[i] > probability) {
        totalBigger += 1;
      }
    }
    const third = Math.round(all.length / 3);
    let color = 1;
    if (totalBigger < third) {
      color = 3;
    } else if (totalBigger >= third && totalBigger < all.length - third) {
      color = 2;
    }
    [].slice
      .call(document.querySelectorAll(`[href="${c}/"]`))
      .forEach(n => n.classList.add(`prefetch-priority-${color}`));
  });
};

const suffixes = [0, 1, 2, 3];
const classBase = 'prefetch-priority-';
const classes = suffixes.map(s => classBase + s);
const uncolorLinks = () => 
  classes.forEach(c => [].slice.call(document.querySelectorAll(`.${c}`)).forEach(e => e.classList.remove(c)));
