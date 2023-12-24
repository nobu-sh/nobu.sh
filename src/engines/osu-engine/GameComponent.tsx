import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { entryPoint } from './osu';

export const GameComponent = () => {
  useEffect(() => {
    // Get the silly-inject-point
    const injectPoint = document.getElementById('silly-inject-point')
    if (!injectPoint) return console.error('Could not find silly-inject-point')

    const app = new PIXI.Application({
      hello: true,
      antialias: true,
      powerPreference: 'high-performance',
      resizeTo: injectPoint,
      backgroundColor: 0x000000,
    })

    injectPoint.appendChild(app.view as any)
    injectPoint.style.overflow = 'hidden'
    
    entryPoint(app)
    return () => {
      app.destroy(true)
      injectPoint.style.overflow = 'unset'
    }
  }, [])

  return <></>
}