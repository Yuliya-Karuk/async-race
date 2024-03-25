import { getDOMElement } from '../../utils/utils';
import styles from './svgComponent.module.scss';

export class SVGComponent{
  private svgNamespace = 'http://www.w3.org/2000/svg';
  private useNamespace = 'http://www.w3.org/1999/xlink';
  private svg: SVGElement;
  private use: SVGUseElement;


  constructor() {
    this.svg = getDOMElement(SVGElement, document.createElementNS(this.svgNamespace, 'svg'));
    this.use = document.createElementNS(this.useNamespace, 'use') as SVGUseElement;
    this.use.setAttributeNS(this.useNamespace, 'xlink:href', `#car1`);
    this.svg.classList.add(styles.carSvg);
    this.svg.append(this.use);
  }

  public getNode() {
    console.log(this.svg);
    return this.svg;
  }

}
