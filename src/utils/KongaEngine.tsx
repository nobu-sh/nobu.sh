import { FC, useEffect, useMemo, useRef } from 'react'
import KongaMP3 from './KongaAudio.mp3'

import './KongaEngine.css'
import { Vector2 } from './vector2';

export const DittoFrames = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAAAdAgMAAAAWQyy/AAAADFBMVEX///+4YOA4ODj4+PhASPNeAAAAAXRSTlMAQObYZgAAAStJREFUeF6l08FqhEAMBuBhbk6fYyj6Pgmul3pZEN9hWV8i9FgvC3X6PELpe2zP9Y/pyCLLFprLoP83STzo/lv+/ZEoGGwMw10RacmePmML4PfOjyqev6WGKDs/Kth40QiEXInxLPzxle+WHUS8kgoi6vU8zzaobIQB31R4QrU4T9RVKl5ngpheaBP1KlmWLlU4z0iCJioORKxCmzm5nDSJAOx0jxthdEBwzOLIkJyFIEGgQpvVqxSMhVRxQKCiEYhozQtbPV/Fmx6iJE5ErYkWgi8mlOYkEiVZxQRpglUojSZB9wJUTDoxkTeMN4J3ot0JT79CTMifRUmUEtV5803EJcD3+5ScS+MmML+feHBhCcKSWOVvw9s07H+LTdwvL/1Fp9yvaggJUx/WD0e0wREEScedAAAAAElFTkSuQmCC'

export const randomColor = () => '#' + Math.floor(16_777_215 * Math.random()).toString(16);

// Basically an abstraction for some react stupidness
export type AnimatorTimeoutMethod = (cb: () => void, target: number, id: string) => void
export type ClearAnimatorTimeoutMethod = (id: string) => void
export interface AnimatorMethodUtil {
  animationTimeout: AnimatorTimeoutMethod
  clearAnimationTimeout: ClearAnimatorTimeoutMethod
}
export interface AnimationTimeout {
  target: number
  current: number
  method: () => void
}
export type AnimatorMethod = (deltaTime: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, util: AnimatorMethodUtil) => void
export const animation = (method: AnimatorMethod, canvas: React.RefObject<HTMLCanvasElement | null>) => {
  const animationRef = useRef<number>(0)
  const prevTime = useRef<number | null>(null)

  const timeoutRefs = useRef<Map<string, AnimationTimeout>>(new Map())

  const newTimeout: AnimatorTimeoutMethod = (cb, target, id): string => {
    if (timeoutRefs.current.has(id)) return id

    timeoutRefs.current.set(id, {
      current: 0,
      target,
      method: cb,
    })

    return id
  }

  const removeTimeout: ClearAnimatorTimeoutMethod = (id) => {
    timeoutRefs.current.delete(id)
  }

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, time: number) => {
    if (prevTime.current !== null) {
      const deltaTime = time - prevTime.current;

      // Cleans Context For Next Frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stops image smoothing
      ctx.imageSmoothingEnabled = false
      // @ts-expect-error just incase
      ctx.webkitImageSmoothingEnabled= false
      // @ts-expect-error just incase
      ctx.mozImageSmoothingEnabled = false

      for (const [, timeout] of timeoutRefs.current) {
        timeout.current += deltaTime
        if (timeout.current >= timeout.target) {
          timeout.current = 0
          timeout.method()
        }
      }

			method(deltaTime, canvas, ctx, { animationTimeout: newTimeout, clearAnimationTimeout: removeTimeout });
    }

    prevTime.current = time;
		animationRef.current = requestAnimationFrame(animate.bind(null, canvas, ctx));
  }

  useEffect(() => {
    // Reset Timeouts
    timeoutRefs.current.clear()
    if (!canvas.current) throw new Error('No Canvas Element')
    const ctx = canvas.current.getContext('2d')
    if (!ctx) throw new Error('Failed to get rendering context!')

    animationRef.current = requestAnimationFrame(animate.bind(null, canvas.current, ctx));
		return () => cancelAnimationFrame(animationRef.current);
  }, [canvas])
}

export interface DittoState {
  opacity: number
  direction: 1 | -1,
  speed: number
}
export class DittoSprite<T extends DittoState = DittoState> {
  public img: HTMLImageElement
  public frameWidth: number = 0;
	public frameHeight: number = 0;
	public currentFrame: 0 | 1 | 2 | 3 = 0;
	public loaded = false;
  public position: Vector2;
  public size: number;

  public state: Partial<T> = {}

  public constructor(state?: T, position: Vector2 = Vector2.zero, size: number = 20) {
    this.state = state ?? {}
    this.position = position
    this.size = size

    this.img = new Image()
    this.img.src = DittoFrames

    if (!this.img.complete || this.img.naturalHeight === 0) {
      this.img.onload = () => {
				this.loaded = true;
				this.frameHeight = this.img.naturalHeight;
				this.frameWidth = this.img.naturalWidth / 4;
			};
    } else {
      this.loaded = true;
			this.frameHeight = this.img.naturalHeight;
			this.frameWidth = this.img.naturalWidth / 4;
    }
  }

  public setState<K extends keyof T>(key: K, value: T[K]): void {
    this.state[key] = value
  }

  public setPosition(x: number, y: number) {
    this.position = Vector2(x, y)
  }

  public getFrameData(frame: 0 | 1 | 2 | 3) {
		return {
			sx: frame * this.frameWidth,
			sy: 0,
			sw: this.frameWidth,
			sh: this.frameHeight,
		};
	}

	public nextFrame() {
		this.currentFrame = this.currentFrame === 3 ? 0 : ((this.currentFrame + 1) as 0 | 1 | 2 | 3);
		return this.getFrameData(this.currentFrame);
	}

  public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    if (!this.loaded) throw new Error('Attempted to draw sprite before loaded!')

    const { sx, sy, sw, sh } = this.getFrameData(this.currentFrame)

    let width = this.frameWidth * this.size
    let height = this.frameHeight * this.size

    if (width > canvas.width) {
      const multiplier = Math.floor(canvas.width / this.frameHeight);
			width = this.frameWidth * multiplier;
			height = this.frameHeight * multiplier;
    }

    if (height > canvas.height) {
			const multiplier = Math.floor(canvas.height / this.frameHeight);
			width = this.frameWidth * multiplier;
			height = this.frameHeight * multiplier;
		}

    ctx.save()

    ctx.globalAlpha = this.state.opacity ?? 1

    ctx.drawImage(
      this.img,
      sx,
      sy,
      sw,
      sh,
      this.position.x - width / 2,
      this.position.y - height / 2,
      width,
      height,
    )

    ctx.restore()
  }
}

export interface KongaCanvasProps {
  width: number
  height: number
}
export const KongaCanvas: FC<KongaCanvasProps> = ({
  width,
  height,
}) => {
  const kongaRef = useRef<HTMLCanvasElement>(null)

  const mainDitto = useRef<DittoSprite>(new DittoSprite())
  const dittos = useRef<DittoSprite[]>([])
  const backgroundState = useRef<{ color1: string; color2: string; }>({
    color1: randomColor(),
    color2: randomColor(),
  })
  const animate: AnimatorMethod = (deltaTime, canvas, ctx, { animationTimeout }) => {
    animationTimeout(() => {
      backgroundState.current = {
        color1: randomColor(),
        color2: randomColor(),
      }
    }, 508, 'changeBgColor')

    animationTimeout(() => {
      mainDitto.current.nextFrame()
      for (const ditto of dittos.current) {
        ditto.nextFrame()
      }
    }, 100, 'dittoFrame')

    animationTimeout(() => {
      const maxDittos = 10
      // Summon Dittos
      if (dittos.current.length < maxDittos) {
        const direction = Math.random() > 0.5 ? 1 : -1 as const
        const newDitto = new DittoSprite(
          {
            speed: Math.random() * 3 + 1,
            opacity: Math.random() > 0.3 ? 1 : 0.5,
            direction,
          },
          Vector2(direction === 1 ? -150 : canvas.width + 150, Math.floor(Math.random() * canvas.height)),
          Math.floor(Math.random() * 18)
        )
        dittos.current.push(newDitto)
      }

      for (const ditto of dittos.current) {
        const newX = ditto.position.x + (1 * (ditto.state.speed ?? 1)) * (ditto.state.direction ?? 1)
        if (newX <= -150 || newX > canvas.width + 150) {
          const index = dittos.current.indexOf(ditto)
          if (index < 0) continue
          dittos.current.splice(index, 1)
        }
        ditto.setPosition(newX, ditto.position.y)
      }
    }, 1, 'dittoHandler')

    ctx.fillStyle = backgroundState.current.color1;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = backgroundState.current.color2;
		ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

    mainDitto.current.setPosition(canvas.width / 2, canvas.height / 2)
    mainDitto.current.draw(canvas, ctx)

    for (const ditto of dittos.current) {
      ditto.draw(canvas, ctx)
    }
  }

  animation(animate, kongaRef)

  return (
    <canvas
      className='kongacompatibility'
      width={width}
      height={height}
      ref={kongaRef}
    ></canvas>
  )
}

/**
 * Does not respect id state changes
 * @param id 
 * @returns 
 */
export const KongaAudio = (id: string): HTMLAudioElement => {
  return useMemo(() => {
    const existing = document.getElementById(id)
    if (existing) return existing as HTMLAudioElement

    const audio = new Audio(KongaMP3)
    audio.preload = "auto"
    audio.controls = false
    audio.loop = true
    audio.id = id

    return document.body.appendChild(audio);
  }, [])
}

