import { Main } from '../../../components/main/main';
import { type Garage } from '../../../pages/garage/garage';
import { type Winners } from '../../../pages/winners/winners';
import { Routes } from '../../../router/router.types';
import { RaceViews } from '../../../types/enums';

export class MainController {
  public main: Main;
  private page: Garage | Winners;
  private pages: { garage?: Garage; winners?: Winners};
  private viewName: RaceViews;

  constructor() {
    this.pages = {};
    this.main = new Main();
  }

  public async setView(location: Routes): Promise<void> {
    switch (location) {
      case Routes.Winners:
        const { Winners } = await import('../../../pages/winners/winners');
        this.page = new Winners()
        // this.controller.main.setContent(new Winners());
        break;
      default:
        if (!this.pages.garage) {
          const { Garage } = await import('../../../pages/garage/garage');
          this.pages.garage = new Garage();
        }
        this.viewName = RaceViews.garage;
        this.page = this.pages.garage;
        this.page.loadPage(1);
        this.main.setContent(this.page.view.getNode());
    }
  }

}