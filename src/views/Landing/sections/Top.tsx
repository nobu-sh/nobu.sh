import Clamp from '@/components/Clamp'
import Icon from '@/assets/favicon.webp'
import GitHub from '@/icons/GitHub'
import LinkedIn from '@/icons/LinkedIn'
import Discord from '@/icons/Discord'

import './Top.scss'

const Top = () => (
  <Clamp className="Top"> 
    <div className="Hero">
      <div className="Text">
        <p className="FooBar">Foo Bar Baz</p>
        <h1>Yooo, I'm <span className="Accent">Nobu</span></h1>
        <h1 className="Dimmed">I create stuff</h1>
        <p className="ShortAbout">I'm a software developer located in East Moline, Illinois specializing in creating and designing high-quality websites and applications</p>
        <div className="Socials">
          <a href="https://www.linkedin.com/in/nobu-sh/" className="LinkedIn" target="_blank"><LinkedIn /></a>
          <a href="https://github.com/nobu-sh" className="Github" target="_blank"><GitHub /></a>
          <a href="https://discord.com/users/316669053957832706" className="Discord" target="_blank"><Discord /></a>
        </div>
      </div>
      <div className="Icon">
        <img src={Icon} draggable="false" />
      </div>
    </div>
  </Clamp>
)

export default Top
