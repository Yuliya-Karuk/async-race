import { Car } from '../../../components/car/car';
import { TCar } from '../../../types/types';
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

  constructor(car: TCar) {
    this.id = car.id;
    this.color = car.color;
    this.name = car.name;
    this.view = new Car(car);
    this.bindRaceListeners();
  }

  private bindRaceListeners(): void {
    this.view.startButton.addEventListener('click', () => this.startRaceCar());
    this.view.stopButton.addEventListener('click', () => this.stopRaceCar());
  }

  private async startRaceCar(): Promise<void> {
    this.view.setRaceButtons(true);
    await this.prepareEngine();
    this.startAnimation();
  }

  private async prepareEngine(): Promise<void> {
    const { velocity, distance } = await CarsApi.startCarEngine(this.id);
    const AnimationTimeInS = distance / velocity / 1000;

    this.raceLength = window.innerWidth - 40 - 20 - 80;

    this.carSpeed = this.raceLength / AnimationTimeInS / 60;

    this.currentPoint = 0;
    this.isEngineWork = true;
  }

  private async startAnimation(): Promise<number> {
    const animate = (): void => {
      this.view.moveCarImage(this.currentPoint);

      this.currentPoint += this.carSpeed;

      if (this.currentPoint <= this.raceLength && this.isEngineWork) {
        requestAnimationFrame(animate);
      } else if (this.currentPoint > this.raceLength && this.isEngineWork) {
        console.log('race ended');
      } else {
        console.log('broken');
      }
    };

    requestAnimationFrame(animate);
    this.isEngineWork = await CarsApi.driveCar(this.id);

    return this.id;
  }

  private async stopRaceCar(): Promise<void> {
    await CarsApi.stopCar(this.id);

    this.isEngineWork = false;
    this.currentPoint = 0;
    this.view.moveCarImage(this.currentPoint);
    this.view.setRaceButtons(false);
  }
}
