import * as PIXI from 'pixi.js';
import * as PIXIUI from '@pixi/ui'
import { GameScreen, GameState, NOsuRegistry } from './GameState';
import { ScreenReturn, centerItem, component, screen } from './GameEngine';
import { MathF } from './mathf';

const MinWidth = 1000;
const MinHeight = 800;

function isScreenTooSmall(app: PIXI.Application<PIXI.ICanvas>) {
  return app.screen.width < MinWidth || app.screen.height < MinHeight;
}

export function entryPoint(app: PIXI.Application<PIXI.ICanvas>) {
  // If view is too small, don't continue
  const game = new GameState();

  if (isScreenTooSmall(app)) {
    game.currentScreen = GameScreen.TooSmall;
  }

  const container = gameContainer(app, game);
  app.stage.addChild(container.screen);

  app.renderer.on('resize', () => container.resize?.());
  app.ticker.add((delta) => container.update?.(delta));
}

const gameContainer = screen((container, app, game) => {
  let currentScreen: ScreenReturn | null = null;
  let currentScreenId: GameScreen | null = null;

  return {
    update: (delta) => {
      // Handle screen changes
      if (game.currentScreen !== currentScreenId) {
        if (currentScreen) {
          container.removeChild(currentScreen.screen);
          currentScreen.destroy?.();
        }

        switch (game.currentScreen) {
          case GameScreen.TooSmall:
            currentScreen = tooSmallScreen(app, game);
            break;
          case GameScreen.Startup:
            currentScreen = loadingScreen(app, game);
            break;
          case GameScreen.MainMenu:
            currentScreen = mainScreen(app, game);
            break;
          default:
            throw new Error(`Unknown screen ${game.currentScreen}`);
        }

        currentScreenId = game.currentScreen;
        container.addChild(currentScreen.screen);
      }

      currentScreen?.update?.(delta);
    },
    resize: () => {
      currentScreen?.resize?.();
      if (isScreenTooSmall(app)) {
        game.currentScreen = GameScreen.TooSmall;
      }
    },
  };
});

const tooSmallScreen = screen((container, app, game) => {
  const tooSmallText = new PIXI.Text('Your window is too small!', {
    fill: 0xffffff,
    fontSize: 24,
    align: 'left',
  });

  tooSmallText.anchor.set(0.5);
  tooSmallText.x = app.screen.width / 2;
  tooSmallText.y = app.screen.height / 2;

  container.addChild(tooSmallText);

  return {
    resize: () => {
      centerItem(tooSmallText, app);
      if (!isScreenTooSmall(app)) {
        game.currentScreen = GameScreen.Startup;
      }
    },
    update: () => {},
  }
});

const loadingScreen = screen((container, app, game) => {  
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;

  const progressBar = new PIXIUI.CircularProgressBar({
    backgroundColor: 0x111111,
    lineWidth: 60,
    radius: 100,
    value: 50,
    fillColor: 0xe592b6,
    cap: 'round'
  });

  progressBar.width = 80;
  progressBar.height = 80;

  container.addChild(progressBar);

  const loadingText = new PIXI.Text('Loading Registry...', {
    fill: 0xffffff,
    align: 'left',
  });

  loadingText.anchor.set(0.5);
  loadingText.x = 10;
  loadingText.y = 80;

  container.addChild(loadingText);

  if (!game.isLoaded) {
    game.loadRegistry().catch((err) => {
      console.error(err);
      loadingText.text = 'Failed to load registry!';
    });
  }

  let isFilling = false;
  return {
    resize: () => {
      centerItem(container, app);
    },
    update: () => {
      if (progressBar.progress >= 92) {
        isFilling = false;
      } else if (progressBar.progress <= 0) {
        isFilling = true;
      }

      isFilling ? progressBar.progress += 0.5 : progressBar.progress -= 0.5;
      progressBar.rotation += 0.1;

      if (game.isLoaded) {
        game.currentScreen = GameScreen.MainMenu;
      }
    },
  }
});

const HorizontalPad = 62
const ButtonWidth = 800

const mainScreen = screen((container, app, game) => {
  const targetWidth = MathF.Clamp(app.screen.width, 0, 1356 + HorizontalPad * 2);
  const targetHeight = app.screen.height - 80;
  // Center the container
  container.x = 0;
  container.y = 80;

  const buttons = game.registry!.map((song) =>  SongButton(song))
  const scrollBox = new PIXIUI.ScrollBox({
    width: targetWidth,
    height: targetHeight,
    type: 'vertical',
    horPadding: targetWidth - ButtonWidth - HorizontalPad,
    padding: 20,
    elementsMargin: 8,
    items: buttons,
  });

  scrollBox.x = app.screen.width / 2 - targetWidth / 2;
  scrollBox.y = 0;

  container.addChild(scrollBox);

  return {
    resize: () => {
      const targetWidth = MathF.Clamp(app.screen.width, 0, 1356 + HorizontalPad * 2);
      const targetHeight = app.screen.height - 80;
      
      scrollBox.init({
        width: targetWidth,
        height: targetHeight,
        type: 'vertical',
        horPadding: targetWidth - ButtonWidth - HorizontalPad,
        padding: 20,
        elementsMargin: 8,
        items: buttons,
      });

      scrollBox.x = app.screen.width / 2 - targetWidth / 2;
      scrollBox.y = 0;
    },
    update: () => {
    },
  }
});

const SongButton = (song: NOsuRegistry): PIXIUI.ButtonContainer => {
  const graphics = new PIXI.Graphics();

  const title = new PIXI.Text(song.title, {
    fill: 0xfafafa,
    align: 'left',
    wordWrap: true,
    wordWrapWidth: ButtonWidth - 40,
    fontSize: 20,
  });


  const artist = new PIXI.Text(song.artist, {
    fill: 0xe592b6,
    align: 'left',
    wordWrap: true,
    wordWrapWidth: ButtonWidth - 40,
    fontSize: 16,
  });

  const divider = new PIXI.Text('//', {
    fill: 0x444444,
    align: 'left',
    wordWrap: true,
    wordWrapWidth: ButtonWidth - 40,
    fontSize: 16,
  });

  const author = new PIXI.Text(song.creator, {
    fill: 0x666666,
    align: 'left',
    wordWrap: true,
    wordWrapWidth: ButtonWidth - 40,
    fontSize: 16,
  });

  const artistList = new PIXIUI.List({
    elementsMargin: 4,
    type: 'horizontal',
    children: [
      artist,
      divider,
      author
    ],
  })

  const parentList = new PIXIUI.List({
    horPadding: 20,
    vertPadding: 18,
    elementsMargin: 4,
    type: 'vertical',
    children: [
      title,
      artistList
    ],
  })

  graphics.addChild(parentList);
  graphics.beginFill(0x111111);
  
  // Draw rect with rounded corners
  graphics.drawRoundedRect(0, 0, ButtonWidth, parentList.height + parentList.vertPadding * 2, 10);

  const button = new PIXIUI.ButtonContainer(graphics)

  button.on('mouseenter', () => {
    graphics.tint = 0xe592b6;
  });

  button.on('mouseleave', () => {
    graphics.tint = 0xffffff;
  });


  return button;
}