import { Car } from "../../../components/car/car";
import { TCar } from "../../../types/types";


export class CarController {
  public view: Car;
  // private id: number;
  private name: string;
  private color: string;

  constructor(car: TCar) {
    // this.id = car.id;
    this.color = car.color;
    this.name = car.name;
    this.view = new Car(this.name, this.color);
  }


}