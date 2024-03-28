import { createElementWithProperties } from '../../utils/utils';
import { BaseComponent } from '../baseComponent';
import styles from './modal.module.scss';

const ModalConst = {
  showModal: 'modal_active',
};

export class Modal extends BaseComponent {
  private winner: HTMLHeadingElement;
  private time: HTMLParagraphElement;

  constructor() {
    super('div', [styles.modal]);

    this.renderContent();
  }

  private renderContent(): void {
    this.winner = createElementWithProperties('h2', [styles.modalText]);
    this.time = createElementWithProperties('p', [styles.modalText]);

    const container = createElementWithProperties('div', [styles.modalContent], undefined, undefined, [
      this.winner,
      this.time,
    ]);

    this.appendChildren([container]);
  }

  public setWinner(winner: string, time: number): void {
    this.winner.innerHTML = `The Winner is <b>${winner}</b>`;
    this.time.innerHTML = `Race time is <b>${time} s</b>`;
  }

  public showModal(): void {
    this.node.classList.add(ModalConst.showModal);
  }

  public hideModal(): void {
    this.node.classList.remove(ModalConst.showModal);
  }
}
