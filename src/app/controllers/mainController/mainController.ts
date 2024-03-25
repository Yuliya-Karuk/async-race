import { Main } from '../../../components/main/main';
import { Garage } from '../../../pages/garage/garage';
import { Winners } from '../../../pages/winners/winners';
import { Routes } from '../../../router/router.types';
import { CarsDatabase } from '../../model/carsDatabase';

export class MainController {
  public main: Main;
  private page: Garage | Winners;
  private carsDB: CarsDatabase;

  constructor() {
    this.main = new Main();
    this.carsDB = new CarsDatabase();
  }

  public async setView(location: Routes): Promise<void> {
    switch (location) {
      case Routes.Winners:
        const { Winners } = await import('../../../pages/winners/winners');
        this.page = new Winners()
        // this.controller.main.setContent(new Winners());
        break;
      default:
        const { Garage } = await import('../../../pages/garage/garage');
        this.page = new Garage()
        this.loadPage(1)
        this.main.setContent(this.page.view.getNode());
    }
  }

  private async loadPage(pageNumber: number = 1): Promise<void> {
    if (this.page instanceof Garage) {
      const carsPage = await this.carsDB.getCars({ pageNum: pageNumber, carsPerPage: 5 });
      this.page.renderPage(carsPage);
    }
  }

}