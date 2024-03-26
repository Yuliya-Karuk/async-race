import { Car } from "../../../components/car/car";
import { TCar } from "../../../types/types";
import { CarsApi } from "../../model/carsDatabase";


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
  }

  private async startRaceCar(): Promise<void> {
    await this.prepareEngine();
    this.startAnimation();
  }

  private async prepareEngine(): Promise<void> {
    const { velocity, distance } = await CarsApi.startCarEngine(this.id);
    const AnimationTimeInS = (distance / velocity) / 1000;

    this.raceLength = window.innerWidth - 40 - 20 - 80;

    this.carSpeed = this.raceLength / AnimationTimeInS / 60;

    this.currentPoint = 0;
    this.isEngineWork = true;
  }

  private async startAnimation(): Promise<number> {
    const animate = () => {
      this.view.carImage.style.transform = `translateX(${this.currentPoint}px)`;
      this.currentPoint += this.carSpeed;

      if (this.currentPoint <= this.raceLength && this.isEngineWork) {
        requestAnimationFrame(animate);
      } else if ((this.currentPoint > this.raceLength && this.isEngineWork)) {
        console.log('race ended');
      } else {
        console.log('broken');
      }
    };

    requestAnimationFrame(animate);
    this.isEngineWork = await CarsApi.driveCar(this.id);


    return this.id;
  }

}