import { DomElementAttribute } from "../../types/interfaces";

type Inputs = 'createName' | 'createColor' | 'updateName' | 'updateColor';

export const ToolbarInputs: Record<Inputs, DomElementAttribute> = {
  createName: {
    id: 'create-name',
    type: 'text',
    name: 'create-name',
    required: 'required',
    autocomplete: 'off',
    placeholder: 'Car name'
  },
  createColor: {
    id: 'create-color',
    type: 'color',
    name: 'create-color',
  },
  updateName: {
    id: 'update-name',
    type: 'text',
    name: 'update-name',
    required: 'required',
    autocomplete: 'off',
    placeholder: 'Car name'
  },
  updateColor: {
    id: 'update-color',
    type: 'color',
    name: 'update-color',
  },
};