// Welcome to my scuffed slapped together attempt at a simple
// game engine. I have no idea what I am doing and I am feeling
// lazy so the entire engine will live in this one file. Much love :3

import * as PIXI from 'pixi.js';
import { GameState } from './GameState';

export interface ScreenReturn {
  screen: PIXI.Container;
  update?: (delta: number) => void;
  resize?: () => void;
  destroy?: () => void;
}

export type ScreenBuilder = (
  container: PIXI.Container,
  app: PIXI.Application<PIXI.ICanvas>,
  game: GameState,
) => Omit<ScreenReturn, 'screen'> | void;

export type ScreenInstiantiator = (
  app: PIXI.Application<PIXI.ICanvas>,
  game: GameState,
) => ScreenReturn;

export function screen(builder: ScreenBuilder): ScreenInstiantiator {
  return (app, game) => {
    const container = new PIXI.Container();
    const actions = builder(container, app, game);
    return {
      screen: container,
      update: actions?.update,
      resize: actions?.resize,
      destroy: () => {
        actions?.destroy?.();
        container.destroy();
      },
    };
  };
}

export interface ComponentReturn<T extends PIXI.DisplayObject> {
  component: T;
  update?: (delta: number) => void;
  resize?: () => void;
  destroy?: () => void;
}

export type ComponentBuilder<T extends PIXI.DisplayObject, A extends Array<unknown>> = (
  app: PIXI.Application<PIXI.ICanvas>,
  game: GameState,
  ...args: A
) => ComponentReturn<T> | T;

export type ComponentInstiantiator<T extends PIXI.DisplayObject, A extends Array<unknown>> = (
  app: PIXI.Application<PIXI.ICanvas>,
  game: GameState,
  ...args: A
) => ComponentReturn<T>;

export function component<
  T extends PIXI.DisplayObject,
  A extends Array<unknown>
>(builder: ComponentBuilder<T, A>): ComponentInstiantiator<T, A> {
  return (app, game, ...args) => {
    const actionsOrComponent = builder(app, game, ...args);
    const component = 'component' in actionsOrComponent ? actionsOrComponent.component : actionsOrComponent;
    const actions = 'component' in actionsOrComponent ? actionsOrComponent : undefined;

    return {
      component,
      update: actions?.update,
      resize: actions?.resize,
      destroy: () => {
        actions?.destroy?.();
        component.destroy();
      },
    };
  }
}

export function centerItem(item: PIXI.DisplayObject, app: PIXI.Application<PIXI.ICanvas>) {
  item.x = app.screen.width / 2;
  item.y = app.screen.height / 2;
}

//function startupScreen() {}

// function initialize(app: PIXI.Application<PIXI.ICanvas>) {
//   const progressBar = new PIXIUI.CircularProgressBar({
//     backgroundColor: 0x000000,
//     lineWidth: 10,
//     radius: 100,
//     value: 1,
//     fillColor: 0xffffff,
//   });
  

//   progressBar.x = app.screen.width / 2;
//   progressBar.y = app.screen.height / 2;

//   app.stage.addChild(progressBar);
//   // const helloWorld = new PIXI.Text('Hello Worlds', {
//   //   fill: 0xffffff,
//   // });

//   // helloWorld.anchor.set(0.5);
//   // helloWorld.x = app.screen.width / 2;
//   // helloWorld.y = app.screen.height / 2;

//   // app.stage.addChild(helloWorld);
// }
