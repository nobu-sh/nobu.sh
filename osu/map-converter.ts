// Simple converter for osu! mania maps to be used in my canvas-based shitcode version.
// This only works for 4 key maps.

import { Beatmap } from 'osu-classes';
import { BeatmapDecoder } from 'osu-parsers'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

// const BeatMapPath = "C:\\Users\\nowob\\AppData\\Local\\osu!\\Songs\\575053 Camellia - Exit This Earth's Atomosphere\\Camellia - Exit This Earth's Atomosphere (Protastic101) [1.023 kms].osu"
const BeatMapPath = "C:\\Users\\nowob\\AppData\\Local\\osu!\\Songs\\995539 Camellia - Clouds in the Blue\\Camellia - Clouds in the Blue (Asherz007) [Hard].osu"

// Hardcoded Lane Positions
const Lanes = [64, 192, 320, 448] as const;
const ManiaGameMode = 3 as const;

function isFourKey(beatmap: Beatmap) {
  // Get all x positions of notes
  const xPositions = beatmap.hitObjects.map((n) => n.startPosition.x);
  // Get all y positions of notes
  const yPositions = beatmap.hitObjects.map((n) => n.startPosition.y);

  // Remove duplicates
  const uniqueXPositions = [...new Set(xPositions)];
  const uniqueYPositions = [...new Set(yPositions)];

  if (uniqueXPositions.length !== 4) return false;
  if (uniqueYPositions.length !== 1) return false;

  // Check if all x positions are in the lanes
  for (const x of uniqueXPositions) {
    if (!Lanes.includes(x as typeof Lanes[number])) return false;
  }

  return true;
}

enum ActionType {
  Note,
  BPMChange,
}

function xCoordToLane(x: number) {
  return Lanes.indexOf(x as typeof Lanes[number]);
}

interface NosuNoteAction {
  type: ActionType.Note
  start: number
  end?: number
  lane: number
}

interface NosuBPMChangeAction {
  type: ActionType.BPMChange
  start: number
  bpm: number
}

interface NosuMetadata {
  id: string
  title: string
  artist: string
  creator: string
}

interface NosuFileFormat {
  id: string
  audio: string
  bpm: number
  offset: number
  actions: Array<NosuNoteAction | NosuBPMChangeAction>
}

// ESM Current directory of this file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const decoder = new BeatmapDecoder();
async function main(mapPath: string) {
  const beatmap = await decoder.decodeFromPath(mapPath);

  // Check game mode is mania
  if (beatmap.mode !== ManiaGameMode) {
    throw new Error("Map is not mania!");
  }

  // Check if map is 4 key
  if (!isFourKey(beatmap)) {
    throw new Error("Map is not valid 4 key!");
  }
  
  const id = beatmap.metadata.beatmapId;
  const title = beatmap.metadata.title;
  const artist = beatmap.metadata.artist;
  const creator = beatmap.metadata.creator;

  const audio = beatmap.general.audioFilename;
  const bpm = beatmap.bpm;
  const offset = beatmap.general.audioLeadIn;

  // const holdNote = beatmap.hitObjects.find((n) => n.hitType === HitType.Hold);
  // console.log(holdNote);
  const mappedObjects: NosuNoteAction[] = beatmap.hitObjects.map((n) => {
    const lane = xCoordToLane(n.startPosition.x);
    if (lane === -1) throw new Error("Error while decoding beatmap hit objects. Invalid lane.");
    const start = n.startTime;
    const end = "endTime" in n ? n.endTime as number : undefined;

    return {
      type: ActionType.Note,
      start,
      end,
      lane,
    };
  });

  const mappedBPMChanges: NosuBPMChangeAction[] = beatmap.controlPoints.timingPoints.map((t) => {
    return {
      type: ActionType.BPMChange,
      start: t.startTime,
      bpm: t.bpm,
    };
  });

  // Join and sort actions by start time
  const actions = [...mappedObjects, ...mappedBPMChanges].sort((a, b) => a.start - b.start);

  const output: NosuFileFormat = {
    id: id.toString(),
    audio,
    bpm,
    offset,
    actions,
  };

  const json = JSON.stringify(output);
  const audioPath = path.dirname(BeatMapPath) + "\\" + audio;
  
  // Create new directory for the map
  const mapDir = path.join(__dirname, `../public/maps/${id}`);
  await fs.promises.mkdir(mapDir, { recursive: true });

  // Write map file
  await fs.promises.writeFile(path.join(mapDir, "index.json"), json);

  // Copy audio file
  await fs.promises.copyFile(audioPath, path.join(mapDir, audio));

  // Update registry file
  const registryPath = path.join(__dirname, "../public/maps/registry.json");

  // Try read if not exists then use empty array
  const registry = JSON.parse(await fs.promises.readFile(registryPath, { flag: "a+", encoding: 'utf-8' }).catch(() => "[]") || "[]") as NosuMetadata[];

  // Check if map is already in registry if so remove it
  const index = registry.findIndex((m) => m.id === id.toString());
  if (index !== -1) registry.splice(index, 1);

  const metadata: NosuMetadata = {
    id: id.toString(),
    title,
    artist,
    creator,
  }

  // Add map to registry
  registry.push(metadata);

  // Write registry file
  await fs.promises.writeFile(registryPath, JSON.stringify(registry));

  console.log("Done!");
}

main(BeatMapPath).catch(console.error);
