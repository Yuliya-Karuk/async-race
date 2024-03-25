import { checkDOMElement, getRandomNumber } from '../../utils/utils';
import styles from './svgComponent.module.scss';

export class SVGComponent{
  private svgNamespace = 'http://www.w3.org/2000/svg';
  private useNamespace = 'http://www.w3.org/1999/xlink';
  private spritePath = './sprite/sprite.svg';
  private svg: SVGElement;

  constructor(color: string) {
    const carModel = getRandomNumber(1, 7);

    this.svg = checkDOMElement(SVGElement, document.createElementNS(this.svgNamespace, 'svg'));
    const use = checkDOMElement(SVGUseElement, document.createElementNS(this.svgNamespace, 'use'));

    use.setAttributeNS(this.useNamespace, 'xlink:href', `${this.spritePath}#car${carModel}`);
    this.svg.classList.add(styles.carSvg);

    this.setColor(color);
    this.svg.append(use);
  }

  public getNode() {
    console.log(this.svg);
    return this.svg;
  }

  public setColor(color: string): void {
    this.svg.style.fill = color;
  }

}
