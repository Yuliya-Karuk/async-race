import { CarView } from '../../../components/car/car';
import { FirstFinisher } from '../../../types/interfaces';
import { findTrackLength } from '../../../utils/utils';
import { CarsApi } from '../../api/cars';
import { Car } from '../../models/car';

export class CarController {
  public view: CarView;
  public id: number;
  public name: string;
  public color: string;

  private animationSpeed: number;
  private animationTimeInS: number;
  private currentPoint: number = 0;
  private isEngineWork: boolean;

  constructor(car: Car, animationSpeed: number) {
    this.animationSpeed = animationSpeed;
    this.id = car.id;
    this.color = car.color;
    this.name = car.name;
    this.view = new CarView(car);
    this.bindRaceListeners();
  }

  private bindRaceListeners(): void {
    this.view.startButton.addEventListener('click', () => this.startRaceCar());
    this.view.stopButton.addEventListener('click', () => this.stopRaceCar(false));
  }

  private async startRaceCar(): Promise<void> {
    this.view.setRaceButtons(true);
    await this.prepareEngine();
    this.startAnimation(false);
  }

  public async prepareEngine(): Promise<void> {
    const { velocity, distance } = await CarsApi.startCarEngine(this.id);
    this.animationTimeInS = distance / velocity / 1000;

    this.currentPoint = 0;
    this.isEngineWork = true;
  }

  public async startAnimation(isCommonRace: boolean): Promise<FirstFinisher | never> {
    const animate = (): void => {
      const raceLength = findTrackLength();
      const carSpeed = raceLength / this.animationTimeInS / this.animationSpeed;

      this.view.moveCarImage(this.currentPoint);

      this.currentPoint += carSpeed;

      if (this.currentPoint < raceLength && this.isEngineWork) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    const startTime = Date.now();

    this.isEngineWork = await CarsApi.driveCar(this.id);

    if (!this.isEngineWork && isCommonRace) {
      this.view.setCarBroken();
      return Promise.reject();
    }

    return { id: this.id, startTime };
  }

  public async stopRaceCar(isCommon: boolean): Promise<void> {
    await CarsApi.stopCar(this.id);

    this.isEngineWork = false;
    this.currentPoint = 0;

    this.view.moveCarImage(this.currentPoint);
    this.view.setCarReady();

    if (!isCommon) {
      this.view.setRaceButtons(false);
    }
  }
}
