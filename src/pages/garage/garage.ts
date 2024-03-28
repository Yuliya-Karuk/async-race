import { CarController } from '../../app/controllers/carController/carController';
import { CarsApi } from '../../app/model/carsDatabase';
import { WinnersApi } from '../../app/model/winnersAPI';
import { FirstFinisher } from '../../types/interfaces';
import { TCar } from '../../types/types';
import { getRandomColor, getRandomName, isNotNullable } from '../../utils/utils';
import { validationFunctions } from '../../utils/validityFunctions';
import { GarageView } from './garageView';

export class Garage {
  public view: GarageView;
  private chosenCar: CarController;
  private pageNumber: number;

  constructor() {
    this.view = new GarageView();
    this.pageNumber = 1;

    this.renderStaticParts();
  }

  private renderStaticParts(): void {
    this.view.createToolbar();
    this.view.createCarsContainer();
    this.view.createModal();
    this.bindToolbarListeners();
  }

  public async loadPage(): Promise<void> {
    const carsPage = await CarsApi.getCars(this.pageNumber);

    this.view.toolbar.setPagination(this.pageNumber, CarsApi.carsTotal);
    this.view.toolbar.setStartButtonsState();

    this.renderCars(carsPage);
  }

  public renderCars(carsData: TCar[]): Promise<CarController[]> {
    this.view.cleanCarsContainer();

    const cars = carsData.map(oneCar => {
      const car = new CarController(oneCar);
      this.bindCarListeners(car);
      this.view.carsBlock.append(car.view.getNode());
      return car;
    });

    return Promise.resolve(cars);
  }

  private bindToolbarListeners(): void {
    this.view.toolbar.createCarButton.addEventListener('click', () =>
      this.handleCreateCar(this.view.toolbar.createInputName)
    );

    this.view.toolbar.updateCarButton.addEventListener('click', () =>
      this.handleUpdateCar(this.view.toolbar.updateInputName)
    );

    this.view.toolbar.createCarsButton.addEventListener('click', () => this.create100Cars());

    this.view.toolbar.pgnNext.addEventListener('click', () => this.handlePagination(1));
    this.view.toolbar.pgnPrevious.addEventListener('click', () => this.handlePagination(-1));

    this.view.toolbar.raceButton.addEventListener('click', () => this.startCommonRace());
    this.view.toolbar.resetButton.addEventListener('click', () => this.resetCommonRace());

    document.addEventListener('click', (e: Event) => this.handleClickOutsideModal(e));
  }

  private async handleCreateCar(input: HTMLInputElement): Promise<void> {
    if (this.checkValidityInput(input)) {
      const carData = {
        name: this.view.toolbar.createInputName.value,
        color: this.view.toolbar.createInputColor.value,
      };

      await CarsApi.createCar(carData);
      this.loadPage();
      this.view.toolbar.resetCreateInputs();
    }
  }

  private async handleUpdateCar(input: HTMLInputElement): Promise<void> {
    if (this.checkValidityInput(input)) {
      const carNewData = {
        name: this.view.toolbar.updateInputName.value,
        color: this.view.toolbar.updateInputColor.value,
      };

      await CarsApi.updateCar(this.chosenCar.id, carNewData);
      this.loadPage();
      this.view.toolbar.resetUpdateInputs();
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
    this.view.toolbar.enableUpdateButton();
    this.chosenCar = car;
    this.view.toolbar.updateInputName.value = car.name;
    this.view.toolbar.updateInputColor.value = car.color;
  }

  private async handleDeleteCar(car: CarController): Promise<void> {
    await CarsApi.deleteCar(car.id);
    this.loadPage();
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

    this.loadPage();
  }

  private async startCommonRace(): Promise<void> {
    const cars = await this.stopAllCars();

    const preparePromises = cars.map(car => car.prepareEngine());
    await Promise.all(preparePromises);

    const startPromises = cars.map(car => car.startAnimation());
    const winnerData = await Promise.any(startPromises);
    this.handleFinishRace(winnerData);
  }

  private async stopAllCars(): Promise<CarController[]> {
    this.view.toolbar.disableAllButtons();

    const carsData = await CarsApi.getCars(this.pageNumber);

    const cars = await this.renderCars(carsData);
    cars.forEach(car => car.view.disableRaceButton());

    const stopPromises = cars.map(car => car.stopRaceCar(true));
    await Promise.all(stopPromises);

    return cars;
  }

  private async resetCommonRace(): Promise<void> {
    await this.stopAllCars();
    this.view.toolbar.setStartButtonsState();
  }

  private async handleFinishRace(winnerData: FirstFinisher): Promise<void> {
    this.view.toolbar.setFinishButtonsState();

    const raceTime = (Date.now() - winnerData.startTime) / 1000;
    const winnerCar = await CarsApi.getCar(winnerData.id);

    this.view.modal.setWinner(winnerCar.name, raceTime);
    this.view.modal.showModal();

    this.sendWinnerToServer(winnerCar, raceTime);
  }

  private handleClickOutsideModal(e: Event): void {
    if (e.target === this.view.modal.getNode()) {
      this.view.modal.hideModal();
    }
  }

  private async sendWinnerToServer(winnerCar: TCar, raceTime: number): Promise<void> {
    const isAlreadyWinner = await WinnersApi.getWinner(winnerCar.id);
    if (isAlreadyWinner) {
      const newWinnerData = {
        time: raceTime < isAlreadyWinner.time ? raceTime : isAlreadyWinner.time,
        wins: isAlreadyWinner.wins + 1,
      };

      await WinnersApi.updateWinner(isAlreadyWinner.id, newWinnerData);
    } else {
      await WinnersApi.createWinner({
        id: winnerCar.id,
        wins: 1,
        time: raceTime,
      });
    }
  }

  private handlePagination(direction: number): void {
    this.pageNumber += direction;
    this.loadPage();
  }
}
