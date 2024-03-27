import { CarController } from '../../app/controllers/carController/carController';
import { CarsApi } from '../../app/model/carsDatabase';
import { TCar } from '../../types/types';
import { getRandomColor, getRandomName, isNotNullable } from '../../utils/utils';
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

    const pagesCount = Math.ceil(CarsApi.carsTotal / 7);
    this.view.toolbar.setPaginationNumber(pageNumber, pagesCount);

    this.renderCars(carsPage);
  }

  public renderCars(cars: TCar[]): void {
    this.view.cleanCarsContainer();

    cars.forEach(oneCar => {
      const car = new CarController(oneCar);
      this.bindCarListeners(car);
      this.view.carsBlock.append(car.view.getNode());
    });
  }

  private bindToolbarListeners(): void {
    this.view.toolbar.createCarButton.addEventListener('click', () =>
      this.handleCreateCar(this.view.toolbar.createInputName)
    );
    this.view.toolbar.updateCarButton.addEventListener('click', () =>
      this.handleUpdateCar(this.view.toolbar.updateInputName)
    );
    this.view.toolbar.createCarsButton.addEventListener('click', () => this.create100Cars());
  }

  private async handleCreateCar(input: HTMLInputElement): Promise<void> {
    if (this.checkValidityInput(input)) {
      const carData = {
        name: this.view.toolbar.createInputName.value,
        color: this.view.toolbar.createInputColor.value,
      };

      await CarsApi.createCar(carData);
      this.loadPage(1);
    }
  }

  private async handleUpdateCar(input: HTMLInputElement): Promise<void> {
    if (this.checkValidityInput(input)) {
      const carNewData = {
        name: this.view.toolbar.updateInputName.value,
        color: this.view.toolbar.updateInputColor.value,
      };

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
    car.view.deleteButton.addEventListener('click', () => this.handleDeleteCar(car));
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

  private async create100Cars(): Promise<void> {
    const carsArray = Array.from({ length: 100 }, () => ({
      color: getRandomColor(),
      name: getRandomName(),
    }));

    const promises = carsArray.map(async carData => {
      await CarsApi.createCar(carData);
    });
    await Promise.all(promises);

    this.loadPage(1);
  }
}
