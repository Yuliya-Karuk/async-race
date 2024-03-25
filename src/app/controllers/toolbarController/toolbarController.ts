import { Toolbar } from "../../../components/toolbar/toolbar";


export class ToolbarController {
  public view: Toolbar;

  constructor() {
    this.view = new Toolbar();
  }

  public createToolbar(): void {
    this.view.renderControlBlock();
  }
}