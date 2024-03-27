import { createElementWithProperties } from '../../utils/utils';
import { BaseComponent } from '../baseComponent';
import styles from './footer.module.scss';

export class Footer extends BaseComponent {
  private githubLink = 'https://github.com/Yuliya-Karuk';
  private RSLink = 'https://github.com/rolling-scopes-school/tasks/tree/master/stage1';
  public winnersLink: HTMLAnchorElement;
  public garageLink: HTMLAnchorElement;

  constructor() {
    super('footer', [styles.footer]);

    this.createContent();
  }

  private createContent(): void {
    const linkGithub = createElementWithProperties(
      'a',
      [styles.footerLink],
      { href: `${this.githubLink}` },
      [{ innerText: 'Yuliya' }],
      [createElementWithProperties('span', [styles.footerImgGithub])]
    );

    const linkRS = createElementWithProperties(
      'a',
      [styles.footerLink],
      {
        href: `${this.RSLink}`,
        'aria-label': 'link to RS School',
      },
      undefined,
      [createElementWithProperties('span', [styles.footerImgRs])]
    );

    const footerWrapper = createElementWithProperties('div', [styles.footerWrapper], undefined, undefined, [
      linkGithub,
      linkRS,
    ]);

    this.node.append(footerWrapper);
  }
}
