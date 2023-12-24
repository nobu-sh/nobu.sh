import { kongaState } from '@/state'
import { randomColor } from '@/engines/konga-engine/KongaEngine'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Clamp from '../Clamp'

import './Navbar.scss'

const Navbar = () => {
  const [, setConga] = useRecoilState(kongaState)
  const [clicks, setClicks] = useState(0)
  const logoRef = useRef<HTMLHeadingElement>(null)

  const currentPath = useLocation().pathname

  useEffect(() => {
    if (!logoRef.current || clicks < 1) return
    if (clicks >= 21) {
      setConga(true)
    }

    logoRef.current.style.color = randomColor()

    const resetTimer = setTimeout(() => {
      setClicks(0)
      if (!logoRef.current) return
      logoRef.current.style.color = "var(--accent-color)"
    }, 3_000)

    return () => clearTimeout(resetTimer);
  }, [clicks])

  return (
    <nav>
      <Clamp className='Navbar'>
        
        {
          currentPath === "/silly-game"
            ? <h1 ref={logoRef}><span className='Retro'>{'>'}</span> <span className='Glow'>NOSU</span><span className='Retro Flash'>!</span> <span className='Glow Extra'>MANIA</span></h1>
            : <h1
                ref={logoRef}
                onClick={() => {
                  setClicks((cur) => cur + 1)
                }}
              ><span className='Retro'>{'>'}</span> <span className='Glow'>NOBU</span><span className='Retro Flash'>_</span></h1>
        }
        
        <div className="HangRight">
          {
            currentPath === "/silly-game"
              ? <Link to="/">Back</Link>
              : <>
                  <Link to="/#projects">Projects</Link>
                  <Link to="/#about">About</Link>
                  <Link to="/#connect">#</Link>
                </>
          }
        </div>
      </Clamp>
    </nav>
  )
}

export default Navbar