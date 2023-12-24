import Top from './sections/Top'
import Projects from './sections/Projects'
import About from './sections/About'
import { useLocation, useNavigate } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import { KongaAudio, KongaCanvas } from '@/engines/konga-engine/KongaEngine'
import { Vector2 } from '@/engines/konga-engine/vector2'
import { useRecoilValue } from 'recoil'
import { kongaState } from '@/state'

import './Landing.scss'

const Landing = () => {
  const konga = useRecoilValue(kongaState)
  const kongaAudio = KongaAudio('main-konga-root')

  const [lastKeys, setLastKeys] = useState<Array<string>>([])

  useEffect(() => {
    if (!konga && !kongaAudio.paused) {
      kongaAudio.currentTime = 0.5
      kongaAudio.pause()
    }

    if (konga && kongaAudio.paused) {
      kongaAudio.currentTime = 0.5
      kongaAudio.play()
    }
  }, [konga])

  const navigate = useNavigate()
  const location = useLocation()
  
  // Capture key presses
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      setLastKeys((keys) => [...keys, e.code])
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
  
  // If konami code is typed then redirect to /silly-game
  useEffect(() => {
    if (location.pathname === '/silly-game') return

    const kazuhisaCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
    if (lastKeys.length > 10) setLastKeys([])

    if (lastKeys.join('') === kazuhisaCode.join('')) {
      setLastKeys([])
      navigate('/silly-game')
    }
  }, [lastKeys])

  useEffect(() => {
    if (!['#projects', '#about', '#connect'].includes(location.hash)) return

    const elem = document.getElementById(location.hash)
    if (!elem) return

    const yOffet = -100
    const y = elem.getBoundingClientRect().top + window.scrollY + yOffet

    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [location.hash])

  return (
    <div className="Landing">
      <Top />
      <Projects />
      <About />
      <Konga enabled={konga} />
    </div>
  )
}

const Konga: FC<{ enabled: boolean }> = ({ enabled }) => {
  const [size, setSize] = useState(Vector2(window.innerWidth, window.innerHeight))
  useEffect(() => {
		window.addEventListener('resize', onResize)

		return () => window.removeEventListener('resize', onResize)
	})
	function onResize() {
		setSize(Vector2(window.innerWidth, window.innerHeight))
	}

  if (enabled) return <KongaCanvas width={size.x} height={size.y} />

  return null
}

export default Landing
