import { CarController } from '../../app/controllers/carController/carController';
import { ToolbarController } from '../../app/controllers/toolbarController/toolbarController';
import { TCar } from '../../types/types';
import { GarageView } from './garageView';

export class Garage {
  private toolbar: ToolbarController;
  public view: GarageView;

  constructor() {
    this.view = new GarageView();
    this.toolbar = new ToolbarController();
  }

  private renderCars(cars: TCar[]): void {
    cars.forEach(oneCar => {
      const car = new CarController(oneCar);
      this.view.carsBlock.append(car.view.getNode());
    })
  }

  public renderPage(cars: TCar[]): void {
    this.toolbar.createToolbar();

    this.view.appendChildren([this.toolbar.view.getNode()]);
    this.view.createCarsContainer();

    this.renderCars(cars);
  }
}
