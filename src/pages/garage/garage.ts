import { CarController } from '../../app/controllers/carController/carController';
import { CarsApi } from '../../app/model/carsDatabase';
import { TCar } from '../../types/types';
import { GarageView } from './garageView';

export class Garage {
  public view: GarageView;

  constructor() {
    this.view = new GarageView();
    this.renderStaticParts();
  }

  private renderStaticParts(): void {
    this.view.createToolbar();
    this.view.createCarsContainer();
    this.bindListeners();
  }

  public async loadPage(pageNumber: number = 1): Promise<void> {
    const carsPage = await CarsApi.getCars(pageNumber);
    this.renderCars(carsPage);
  }

  public renderCars(cars: TCar[]): void {
    this.view.cleanCarsContainer();
    cars.forEach(oneCar => {
      const car = new CarController(oneCar);
      this.view.carsBlock.append(car.view.getNode());
    })
  }

  private bindListeners(): void {
    this.view.toolbar.createCarButton.addEventListener('click',() => this.handleCreateCar())
  }

  private async handleCreateCar(): Promise<void> {
    const carData = {
      name: this.view.toolbar.createInputName.value,
      color: this.view.toolbar.createInputColor.value,
      id: CarsApi.carsTotal + 1,
    }
    await CarsApi.createCar<TCar>(carData);
    this.loadPage(1);
  }
}
