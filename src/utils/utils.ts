import { CarNames } from '../data/carNames';
import { Routes } from '../router/router.types';
import { Order, SortBy } from '../types/enums';
import { DomElementAttribute, DomElementProperties } from '../types/interfaces';

export function isNotNullable<T>(value: T): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Not expected value`);
  }
  return value;
}

export function createElementWithProperties<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  classNames: string[],
  attr?: DomElementAttribute,
  props?: DomElementProperties[],
  children?: (HTMLElementTagNameMap[keyof HTMLElementTagNameMap] | SVGElement)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);

  if (classNames.length > 0) {
    element.classList.add(...classNames);
  }

  if (attr) {
    for (let i = 0; i < Object.keys(attr).length; i += 1) {
      const key = Object.keys(attr)[i];
      element.setAttribute(key, attr[key]);
    }
  }

  if (props) {
    Object.assign(element, ...props);
  }

  if (children) {
    children.forEach(child => {
      element.append(child);
    });
  }
  return element;
}

export function checkEventTarget(value: EventTarget | null): HTMLElement {
  if (value instanceof HTMLElement) {
    return value;
  }
  throw new Error(`Not expected value`);
}

interface ConstructorOf<T> {
  new (...args: readonly never[]): T;
}

export function checkDOMElement<T extends Node>(
  elemType: ConstructorOf<T>,
  element: Element | Document | DocumentFragment
): T {
  if (!(element instanceof elemType)) {
    throw new Error(`Not expected value: ${element} of type:${elemType}`);
  }
  return element;
}

export function checkTouch(value: Touch | null): HTMLElement {
  if (value instanceof HTMLElement) {
    return value;
  }
  throw new Error(`Not expected value`);
}

export function CheckRoute(route: string): Routes {
  if (Routes.Garage.includes(route)) {
    return Routes.Garage;
  }
  if (Routes.Winners.includes(route)) {
    return Routes.Winners;
  }
  return Routes.Garage;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
}

export function getRandomColor(): string {
  const color = `#${Math.random().toString(16).slice(3, 9)}`;
  return color;
}

export function getRandomName(): string {
  const { brand } = CarNames[getRandomNumber(0, CarNames.length)];
  const allBrandModels = CarNames[getRandomNumber(0, CarNames.length)].models;
  const model = allBrandModels[getRandomNumber(0, allBrandModels.length)];
  return `${brand} ${model}`;
}

export function findTrackLength(): number {
  const pageWidth = document.documentElement.clientWidth > 1400 ? 1400 : document.documentElement.clientWidth;
  const trackLength = pageWidth - 2 * 20 - 2 * 10 - 80 - 40;
  return trackLength;
}

export function switchOrder(currentOrder: Order): Order {
  switch (currentOrder) {
    case Order.ASC:
      return Order.DESC;
    default:
      return Order.ASC;
  }
}

export function switchSort(currentSort: SortBy): SortBy {
  switch (currentSort) {
    case SortBy.time:
      return SortBy.wins;
    default:
      return SortBy.time;
  }
}

export function getAnimationSpeed(): Promise<number> {
  return new Promise(resolve => {
    function calculateSpeed(): void {
      requestAnimationFrame(t1 => {
        requestAnimationFrame(t2 => {
          resolve(1000 / (t2 - t1));
        });
      });
    }
    calculateSpeed();
  });
}
