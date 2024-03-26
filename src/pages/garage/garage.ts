import { CarController } from '../../app/controllers/carController/carController';
import { CarsApi } from '../../app/model/carsDatabase';
import { TCar } from '../../types/types';
import { isNotNullable } from '../../utils/utils';
import { validationFunctions } from '../../utils/validityFunctions';
import { GarageView } from './garageView';

export class Garage {
  public view: GarageView;
  private chosenCar: CarController;

  constructor() {
    this.view = new GarageView();
    this.renderStaticParts();
  }

  private renderStaticParts(): void {
    this.view.createToolbar();
    this.view.createCarsContainer();
    this.bindToolbarListeners();
  }

  public async loadPage(pageNumber: number = 1): Promise<void> {
    const carsPage = await CarsApi.getCars(pageNumber);
    this.renderCars(carsPage);
  }

  public renderCars(cars: TCar[]): void {
    this.view.cleanCarsContainer();

    cars.forEach(oneCar => {
      const car = new CarController(oneCar);
      this.bindCarListeners(car);
      this.view.carsBlock.append(car.view.getNode());
    })
  }

  private bindToolbarListeners(): void {
    this.view.toolbar.createCarButton.addEventListener('click',() => this.handleCreateCar(this.view.toolbar.createInputName))
    this.view.toolbar.updateCarButton.addEventListener('click',() => this.handleUpdateCar(this.view.toolbar.updateInputName))
  }

  private async handleCreateCar(input: HTMLInputElement): Promise<void> {
    if (this.checkValidityInput(input)) {
      const carData = {
        name: this.view.toolbar.createInputName.value,
        color: this.view.toolbar.createInputColor.value,
        id: CarsApi.carsTotal + 1,
      }

      await CarsApi.createCar<TCar>(carData);
      this.loadPage(1);
    }
  }

  private async handleUpdateCar(input: HTMLInputElement): Promise<void> {
    if (this.checkValidityInput(input)) {
      const carNewData = {
        name: this.view.toolbar.updateInputName.value,
        color: this.view.toolbar.updateInputColor.value,
      }

      await CarsApi.updateCar(this.chosenCar.id, carNewData);
      this.loadPage(1);
    }
  }

  private checkValidityInput(input: HTMLInputElement): boolean {
    const errorSpan = isNotNullable(input.nextSibling?.nextSibling);
    errorSpan.textContent = '';

    for (let i = 0; i < validationFunctions.length; i += 1) {
      errorSpan.textContent += validationFunctions[i](input);
    }

    return errorSpan.textContent === '';
  }

  private bindCarListeners(car: CarController): void {
    car.view.changeButton.addEventListener('click', () => this.chooseCar(car));
    car.view.deleteButton.addEventListener('click', () => this.handleDeleteCar(car))
  }

  private chooseCar(car: CarController): void {
    this.chosenCar = car;
    this.view.toolbar.updateInputName.value = car.name;
    this.view.toolbar.updateInputColor.value = car.color;
  }

  private async handleDeleteCar(car: CarController): Promise<void> {
    await CarsApi.deleteCar(car.id);
    this.loadPage(1);
  }
}
