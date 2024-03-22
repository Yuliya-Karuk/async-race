import { App } from './app/app';
import './styles/style.css';

const app = new App(document.body);

window.onload = (): void => {
  app.init();
};
