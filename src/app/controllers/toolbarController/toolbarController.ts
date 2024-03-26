// import { Toolbar } from "../../../components/toolbar/toolbar";
// import { TCar } from "../../../types/types";
// import { type CarsDatabase } from "../../model/carsDatabase";

// export class ToolbarController {
//   public view: Toolbar;
//   private carsDB: CarsDatabase;

//   constructor(carsDB: CarsDatabase, renderCarsCallback: () => void) {
//     this.callback = renderCarsCallback;
//     this.carsDB = carsDB;
//     this.view = new Toolbar();
//   }

//   public createToolbar(): void {
//     this.view.renderControlBlock();
//     this.bindListeners();
//   }

//   private bindListeners(): void {
//     this.view.createCarButton.addEventListener('click', this.handleCreateCar.bind(this))
//   }

//   private handleCreateCar(): void {
//     console.log(this.view);
//     const carData = {
//       name: this.view.createInputName.value,
//       color: this.view.createInputColor.value,
//       id: this.carsDB.carsTotal + 1,
//     }
//     this.carsDB.createCar<TCar>(carData);
//     this.callback();
//   }
// }