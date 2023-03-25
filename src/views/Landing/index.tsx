import Top from './sections/Top'
import Projects from './sections/Projects'
import About from './sections/About'
import { useLocation } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import { KongaAudio, KongaCanvas } from '@/utils/KongaEngine'
import { Vector2 } from '@/utils/vector2'
import { useRecoilValue } from 'recoil'
import { kongaState } from '@/state'

import './Landing.scss'

const Landing = () => {
  const konga = useRecoilValue(kongaState)
  const kongaAudio = KongaAudio('main-konga-root')

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

  const location = useLocation()
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
