import Clamp from "@/components/Clamp";

import Render from '@/assets/render.webp'

import './About.scss'
import At from "@/icons/At";
import LinkedIn from "@/icons/LinkedIn";
import GitHub from "@/icons/GitHub";
import Discord from "@/icons/Discord";
import Telegram from "@/icons/Telegram";

const About = () => (
  <Clamp className="About">
    <div className="Text">
      <h3 id="#about">About <span>Me</span></h3>
      <p>Heyo,</p>
      <p>My name is <span className="Accent">Nobu</span>, and I'm a software developer located in East Moline, Illinois specializing in creating and designing high-quality websites and applications. I also ponder around with many other hobbies though like gamedev, 3d modeling, and pixel art.</p>
      <p>Way back around the age of 10, I enjoyed using command blocks in Minecraft. This passion spiraled out of control from making addons for the game to learning multiple coding languages to creating full-stack applications and websites.</p>
      <p>As of now, I am constantly working towards creating new things and expanding my knowledge with new technologies.</p>
      <div id="#connect" className="SocialsDivider">
        <p>Contact Me</p>
      </div>
      <div className="Socials">
        <a href="mailto:chat@nobu.sh" className="Mail Stroke" target="_blank">
          <At />
        </a>
        <a href="https://www.linkedin.com/in/nobu-sh/" className="LinkedIn Fill" target="_blank">
          <LinkedIn />
        </a>
        <a href="https://github.com/nobu-sh" className="GitHub Fill" target="_blank">
          <GitHub />
        </a>
        <a href="https://t.me/nobu_sh" className="Telegram Fill" target="_blank">
          <Telegram />
        </a>
        <a href="https://discord.com/users/316669053957832706" className="Discord Fill" target="_blank">
          <Discord />
        </a>
      </div>
    </div>
    <div className="Icon">
      <img src={Render} alt="me" draggable="false" />
      <div className="Overlay"></div>
    </div>
  </Clamp>
)

export default About
