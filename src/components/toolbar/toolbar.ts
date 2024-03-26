import { createElementWithProperties } from '../../utils/utils';
import { BaseComponent } from '../baseComponent';
import styles from './toolbar.module.scss';
import { ToolbarInputs } from './toolbarInputs';

export class Toolbar extends BaseComponent{
  public element: HTMLDivElement;
  public controlsBlock: HTMLDivElement;
  public carsBlock: HTMLDivElement;
  public raceButton: HTMLButtonElement;
  public resetButton: HTMLButtonElement;
  public createCarsButton: HTMLButtonElement;
  public createInputName: HTMLInputElement;
  public createInputColor: HTMLInputElement;
  public createCarButton: HTMLButtonElement;
  public updateInputName: HTMLInputElement;
  public updateInputColor: HTMLInputElement;
  public updateCarButton: HTMLButtonElement;
  public createError: HTMLSpanElement;
  public updateError: HTMLSpanElement;

  constructor() {
    super('div', [styles.toolbar]);
  }

  public renderControlBlock(): void {
    this.renderRaceBlock();
    this.renderCreateCarBlock();
    this.renderUpdateCarBlock();
  }

  private renderRaceBlock(): void {
    this.raceButton = createElementWithProperties('button', ['btn'], { type: 'button' },
      [{ innerText: 'Race' }]);
    this.resetButton = createElementWithProperties('button', ['btn'], { type: 'button' },
      [{ innerText: 'Reset' }]);
    this.createCarsButton = createElementWithProperties('button', ['btn'], { type: 'button' },
      [{ innerText: 'Create Cars' }]);

    const raceContainer = createElementWithProperties('div', [styles.raceContainer], undefined, undefined, [
      this.raceButton,
      this.resetButton,
      this.createCarsButton,
    ]);
    this.appendChildren([raceContainer]);
  }

  private renderCreateCarBlock(): void {
    this.createInputName = createElementWithProperties('input', [styles.inputName], ToolbarInputs.createName);
    this.createInputColor = createElementWithProperties('input', [styles.inputColor], ToolbarInputs.createColor);
    this.createError = createElementWithProperties('span', [styles.inputError]);
    this.createCarButton = createElementWithProperties('button', ['btn', 'btn_centered'], { type: 'button' },
      [{ innerText: 'Create Car' }]);

    const createContainer = createElementWithProperties('div', [styles.controlsContainer], undefined, undefined, [
      this.createInputName,
      this.createInputColor,
      this.createError,
      this.createCarButton,
    ]);
    this.appendChildren([createContainer]);
  }

  private renderUpdateCarBlock(): void {
    this.updateInputName = createElementWithProperties('input', [styles.inputName], ToolbarInputs.updateName);
    this.updateInputColor = createElementWithProperties('input', [styles.inputColor], ToolbarInputs.updateColor);
    this.updateError = createElementWithProperties('span', [styles.inputError]);
    this.updateCarButton = createElementWithProperties('button', ['btn', 'btn_centered'], { type: 'button' },
      [{ innerText: 'Update Car' }]);

    const updateContainer = createElementWithProperties('div', [styles.controlsContainer], undefined, undefined, [
      this.updateInputName,
      this.updateInputColor,
      this.updateError,
      this.updateCarButton,
    ]);
    this.appendChildren([updateContainer]);
  }
}
