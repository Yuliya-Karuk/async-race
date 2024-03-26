import { CarsApi } from '../../app/model/carsDatabase';
import { Car } from '../../components/car/car';
import { TCar } from '../../types/types';
import { isNotNullable } from '../../utils/utils';
import { validationFunctions } from '../../utils/validityFunctions';
import { GarageView } from './garageView';

export class Garage {
  public view: GarageView;
  private cars: Car[] = [];
  private chosenCar: Car;

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
    this.cars = [];

    cars.forEach(oneCar => {
      const car = new Car(oneCar);
      // this.cars.push(car);
      this.bindCarListeners(car);
      this.view.carsBlock.append(car.getNode());
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
    console.log(this.checkValidityInput(input));
    if (this.checkValidityInput(input)) {
      const carNewData = {
        name: this.view.toolbar.updateInputName.value,
        color: this.view.toolbar.updateInputColor.value,
      }

      console.log(this.chosenCar.id, carNewData);
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

  private bindCarListeners(car: Car): void {
    car.changeButton.addEventListener('click', () => this.chooseCar(car));
  }

  private chooseCar(car: Car): void {
    this.chosenCar = car;
    this.view.toolbar.updateInputName.value = car.name;
    this.view.toolbar.updateInputColor.value = car.color;
  }
}
