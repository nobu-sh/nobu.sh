import Clamp from '@/components/Clamp'

import Dragon from '@/assets/dragon.webp'
import MAEC from '@/assets/maec.webp'
import Blog from '@/assets/blog.webp'
import PVZ from '@/assets/pvz.webp'

import './Projects.scss'
import GitHub from '@/icons/GitHub'
import Globe from '@/icons/Globe'
import { useState } from 'react'

export interface SpotlightProject {
  name: string
  description: string
  image: string
  technologies: string[]
  github?: string
  url?: string
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  github?: string
  url?: string
}

export const SpotlightProjectItems: SpotlightProject[] = [
  {
    name: 'Meta Ape Elite Club',
    description: 'Staking website for an NFT community; The backend uses Fastify and Redis to provide quick API responses. It also utilizes Solana on-chain data via Helius RPC provider.',
    image: MAEC,
    technologies: ['React', 'SASS', 'Web3', 'Fastify'],
    url: 'https://metaapeeliteclub.com/'
  },
  {
    name: 'Dragon',
    description: 'Unreleased web page and blog site for a Minecraft community built with React using Vite; It is optimized, responsive, and fits the Minecraft feel.',
    image: Dragon,
    technologies: ['React', 'SCSS', 'TypeScript', 'PocketBase'],
  },
  {
    name: 'My Blog',
    description: "A personal blog that goes more in-depth on how I started coding. It's also a proof of concept for my future blog website. Written in raw HTML and CSS because why not :)",
    image: Blog,
    technologies: ['HTML', 'CSS'],
    github: 'https://github.com/nobu-sh/about-me',
    url: 'https://blog.nobu.sh/'
  },
  {
    name: 'Plants Vs. Zombies VR',
    description: "Work in progress Plants Vs. Zombies built for VR. It is being developed in Unity 2019.4.31f1 LTS, there is no definite release date but it's in the works!",
    image: PVZ,
    technologies: ['C#', 'Unity', 'VR/AR', 'Blender']
  },
]

export const ProjectItems: Project[] = [
  {
    name: 'BeAPI',
    description: 'An utility wrapper that wraps Minecraft Bedrock Editions new scripting API to make it easier to create TypeScript/JavaScript projects.',
    technologies: ['TypeScript', 'Minecraft', 'Transpiler'],
    github: 'https://github.com/beapijs/beapi',
    url: 'https://beapijs.github.io/beapi/'
  },
  {
    name: 'mc-color',
    description: 'A VSCode extension that adds color formatting for the Minecraft color escape character §. It also supports a variety of configurations.',
    technologies: ['TypeScript', 'Extension', 'Format'],
    github: 'https://github.com/nobu-sh/vscode-mc-color',
    url: 'https://marketplace.visualstudio.com/items?itemName=Nobuwu.mc-color',
  },
  {
    name: 'fine-tuned',
    description: 'Work in progress music streaming library for Discord.JS. It supports a variety of filters and platforms. The API is just not exposed yet.',
    technologies: ['Discord.JS', 'TypeScript', 'FFmpeg'],
    github: 'https://github.com/nobu-sh/fine-tuned'
  },
  {
    name: 'djseed',
    description: 'A utility library for multithreading your Discord bot. More useful utilities are still being added but it does what it advertises :)',
    technologies: ['Discord.JS', 'TypeScript', 'Sharding'],
    github: 'https://github.com/nobu-sh/djseed',
    url: 'https://nobu-sh.github.io/djseed/'
  },
  {
    name: 'dotlang',
    description: 'Parses .lang files and provides mapped results. Useful for internationalization or parsing a Minecraft language directory.',
    technologies: ['JavaScript', 'NPM'],
    github: 'https://github.com/nobu-sh/dotlang',
  },
  {
    name: 'hueblocks',
    description: "Website for generating gradient block palettes for Minecraft. I didn't directly make this, I contributed a few features.",
    technologies: ['JQuery', 'HTML', 'CSS'],
    github: 'https://github.com/1280px/hueblocks',
    url: 'https://1280px.github.io/hueblocks/',
  },
]

const Projects = () => {
  const [more, setMore] = useState(false)

  return (
    <Clamp className='Projects'>
      <h3 id="#projects">Project <span>Spotlight</span></h3>
      <p className='Subtitle'>Some of the stuff I've created</p>
      <div className="ProjectArea">
        {SpotlightProjectItems.map((item) => (
          <div className="ProjectItem" key={item.name}>
            <div className="Text">
              <h5>{item.name}</h5>
              <p>{item.description}</p>
              <div className="Technologies">
                {item.technologies.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
              <div className="Links">
                {item.github ? <a href={item.github} className="Github" target="_blank">
                  <GitHub />
                </a> : null}
                {item.url ? <a href={item.url} className="LinkTo" target="_blank">
                  <Globe />
                </a> : null}
              </div>
            </div>
            <div className="Image">
              <a href={item.url ?? "/#projects"} target={item.url ? '_blank' : '_self'}>
                <img src={item.image} alt={item.name} draggable="false" />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="ExtraProjectArea">
        <div className="ExtraProjects">
          {more ? <MoreProjects /> : null}
        </div>
        <button 
          className='ShowExtra'
          onClick={() => setMore(!more)}
        >{more ? 'Show less' : 'Show more'}</button>
      </div>
    </Clamp>
  )
}

const MoreProjects = () => (
  <ul className="MoreProjects">
    {ProjectItems.map((item) => (
      <li key={item.name}>
        <a className='ExProject' href={item.url ?? '/#projects'} target={item.url ? '_blank' : '_self'}>
          <div className="Title">
            <h6>{item.name}</h6>
            <div className="Links">
              {item.github ? <a href={item.github} className="Github" target="_blank">
                <GitHub />
              </a> : null}
              {item.url ? <a href={item.url} className="LinkTo" target="_blank">
                <Globe />
              </a> : null}
            </div>
          </div>
          <p>{item.description}</p>
          <div className="Technologies">
            {item.technologies.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </a>
      </li>
    ))}
  </ul>
)

export default Projects
