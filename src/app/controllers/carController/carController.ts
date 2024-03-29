import { Car } from '../../../components/car/car';
import { FirstFinisher } from '../../../types/interfaces';
import { TCar } from '../../../types/types';
import { findTrackLength } from '../../../utils/utils';
import { CarsApi } from '../../model/carsDatabase';

export class CarController {
  public view: Car;
  public id: number;
  public name: string;
  public color: string;

  private raceLength: number;
  private carSpeed: number;
  private currentPoint: number = 0;
  private isEngineWork: boolean;
  private isFinished: boolean;

  constructor(car: TCar) {
    this.id = car.id;
    this.color = car.color;
    this.name = car.name;
    this.view = new Car(car);
    this.bindRaceListeners();
  }

  private bindRaceListeners(): void {
    this.view.startButton.addEventListener('click', () => this.startRaceCar());
    this.view.stopButton.addEventListener('click', () => this.stopRaceCar(false));
  }

  private async startRaceCar(): Promise<void> {
    this.view.setRaceButtons(true);
    await this.prepareEngine();
    this.startAnimation();
  }

  public async prepareEngine(): Promise<void> {
    const { velocity, distance } = await CarsApi.startCarEngine(this.id);
    const AnimationTimeInS = distance / velocity / 1000;

    this.raceLength = findTrackLength();

    this.carSpeed = this.raceLength / AnimationTimeInS / 60;

    this.currentPoint = 0;
    this.isEngineWork = true;
    this.isFinished = false;
  }

  public async startAnimation(): Promise<FirstFinisher | never> {
    const animate = (): void => {
      this.view.moveCarImage(this.currentPoint);

      this.currentPoint += this.carSpeed;

      if (this.currentPoint < this.raceLength && this.isEngineWork) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    const startTime = Date.now();

    this.isEngineWork = await CarsApi.driveCar(this.id);

    if (this.isEngineWork === false) {
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
