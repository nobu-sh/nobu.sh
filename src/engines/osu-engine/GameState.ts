// The global game state. Not a fan of this too much. I prefer keeping states
// isolated to their relevant components. But this is a lazy easter egg.

// Map loading currently is not too optimized. Everything is stored in memory
// It is lost when the game is unmounted. This is fine for now.

export enum GameScreen {
  Startup,
  MainMenu,
  Gameplay,
  PauseMenu,
  ResultsScreen,
  TooSmall,
}

export interface NOsuRegistry {
  id: string
  title: string
  artist: string
  creator: string
}

enum NOsuMapActionType {
  Note,
  BPMChange,
}

export interface NOsuMapActionNote {
  type: NOsuMapActionType.Note
  start: number
  end?: number
  lane: number
}

export interface NOsuMapActionBPMChange {
  type: NOsuMapActionType.BPMChange
  start: number
  bpm: number
}

export type NOsuMapAction = NOsuMapActionNote | NOsuMapActionBPMChange

export interface NOsuMap {
  id: string
  audio: string
  bpm: number
  offset: number
  actions: Array<NOsuMapAction>
}

export type Action<A> = (_a: A) => void

export class GameState {
  public currentScreen: GameScreen = GameScreen.Startup;

  public isLoaded: boolean = false;
  // Null if game is not loaded. Otherwise contains registry of all maps.
  public registry: Array<NOsuRegistry> | null = null;

  // Memory cache of downloaded maps. This is not optimized at all.
  public cachedMaps: Map<string, NOsuMap> = new Map();

  // Current map being played. Null if no map is being played.
  public currentMap: NOsuMap | null = null;

  public downloadingMap: NOsuRegistry | null = null;

  public constructor() {}

  public async loadRegistry() {
    // Artificial delay to show off loading screen
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const registry = await fetch("/maps/registry.json").then(res => res.json());
    this.registry = registry;
    this.isLoaded = true;
  }

  public async getMap(id: string): Promise<NOsuMap> {
    if (this.cachedMaps.has(id)) {
      return this.cachedMaps.get(id)!;
    }

    throw new Error("Not Implemented!");
    // const map = await fetch(`/maps/${id}.json`).then(res => res.json());
    // this.cachedMaps.set(id, map);
    // return map;
  }
}