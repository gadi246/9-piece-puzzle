// global css
import './theme/theme.scss';
import gameArr from './services/gameService';

// classes you want to use immediately
import {App} from './App';

/**
 * entrance code for SPA
 */
const main = () => (
  new App({elm: document.querySelector('.container'), data: gameArr()}).render()
);

document.addEventListener('DOMContentLoaded', main);
