import { Main } from '../../../components/main/main';
import { type Garage } from '../../../pages/garage/garage';
import { type Winners } from '../../../pages/winners/winners';
import { Routes } from '../../../router/router.types';

export class MainController {
  public main: Main;
  private page: Garage | Winners;
  private pages: { garage?: Garage; winners?: Winners };

  constructor() {
    this.pages = {};
    this.main = new Main();
  }

  public async setView(location: Routes): Promise<void> {
    switch (location) {
      case Routes.Winners:
        if (!this.pages.winners) {
          const { Winners } = await import('../../../pages/winners/winners');
          this.pages.winners = new Winners();
        }

        this.page = this.pages.winners;
        this.page.loadPage();
        this.main.setContent(this.page.view.getNode());
        break;
      default:
        if (!this.pages.garage) {
          const { Garage } = await import('../../../pages/garage/garage');
          this.pages.garage = new Garage();
        }

        this.page = this.pages.garage;
        this.page.loadPage();
        this.main.setContent(this.page.view.getNode());
    }
  }
}
