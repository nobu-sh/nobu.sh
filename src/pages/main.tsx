import {
	GitHubLogoIcon,
	GlobeIcon,
	LinkedInLogoIcon
} from "@radix-ui/react-icons";
import { AtSignIcon, Download, Github } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

import Page from "@/components/page";
import Icon from "@/assets/favicon.webp";
import Dragon from "@/assets/dragon.webp";
import MAEC from "@/assets/maec.webp";
import Blog from "@/assets/blog.webp";
import PVZ from "@/assets/pvz.webp";
import Telegram from "@/icons/telegram";
import Discord from "@/icons/discord";
import Render from "@/assets/render.webp";
import { kongaState } from "@/states";

export default function MainPage() {
	// Custom hash handle so we can make things fancy :3
	const location = useLocation();

	// On hash change scroll to the element
	useEffect(() => {
		// eslint-disable-next-line unicorn/prefer-query-selector
		const element = document.getElementById(`#${location.hash.slice(1)}`);
		if (!element) return;

		const yOffset = -100;
		const elementRect = element.getBoundingClientRect();
		const elementTop = elementRect.top + window.scrollY + yOffset;

		window.scrollTo({ top: elementTop, behavior: "smooth" });
	}, [location.hash]);

	return (
		<Page>
			<TopSection />
			<ProjectsSection />
			<AboutSection />
			<Footer />
		</Page>
	);
}

function TopSection() {
	const [clicks, setClicks] = useState(0);
	const [, setKonga] = useRecoilState(kongaState);
	const logoReference = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (!logoReference.current || clicks < 1) return;
		if (clicks >= 21) {
			setKonga(true);
		}

		// Vibrate Animation
		logoReference.current.style.animation = "vibrate 0.15s linear infinite";
		// Hue shift
		logoReference.current.style.filter = `hue-rotate(${clicks * 25}deg)`;
		// Transition
		logoReference.current.style.transition = "filter 0.2s ease-in-out";

		const resetTimer = setTimeout(() => {
			setClicks(0);
			if (!logoReference.current) return;
			logoReference.current.style.transition = "filter 0.4s ease-in-out";
			logoReference.current.style.filter = "";
			logoReference.current.style.animation = "";
		}, 2000);

		return () => clearTimeout(resetTimer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clicks]);

	return (
		<section className="md:min-h-[calc(100vh-5rem)] min-h-0 flex xl:py-60 md:py-40 py-20 select-none">
			<div className="grid grid-cols-1 xl:grid-cols-2 w-full -mt-20">
				<div className="flex flex-col items-start justify-center">
					<p className="text-lg font-black font-code text-foreground-dark mb-1">
						Foo Bar Baz
					</p>
					<h1 className="md:text-6xl text-5xl font-extrabold text-foreground">
						Yooo, I&apos;m <span className="text-accent">Nobu</span>
					</h1>
					<h1 className="md:text-5xl text-4xl font-extrabold text-foreground-dim">
						I create stuff
					</h1>
					<p className="text-xl text-foreground-dim my-4 xl:max-w-none max-w-[40rem]">
						I&apos;m a software developer located in East Moline, Illinois
						specializing in creating and designing high-quality websites and
						applications
					</p>
					<div className="flex flex-row gap-4">
						<a
							className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
							href="https://www.linkedin.com/in/nobu-sh/"
						>
							<LinkedInLogoIcon className="w-10 h-10" />
						</a>
						<a
							className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
							href="https://github.com/nobu-sh"
						>
							<GitHubLogoIcon className="w-10 h-10" />
						</a>
						<a
							className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
							href="mailto:chat@nobu.sh"
						>
							<AtSignIcon className="w-10 h-10" />
						</a>
					</div>
				</div>
				<div className="flex flex-col xl:items-end items-center xl:justify-center justify-end row-start-1 xl:row-start-auto xl:translate-x-12 translate-x-0">
					<img
						alt="Nobu Logo"
						className="w-[23rem] h-[23rem]"
						draggable={false}
						ref={logoReference}
						src={Icon}
						onClick={() => setClicks((clicks) => clicks + 1)}
					/>
				</div>
			</div>
		</section>
	);
}

interface Project {
	name: string;
	description: string;
	technologies: Array<string>;
	github?: string;
	url?: string;
}

interface SpotlightProject extends Project {
	image: string;
}

const spotlightProjects: Array<SpotlightProject> = [
	{
		name: "Meta Ape Elite Club",
		description:
			"Staking website for an NFT community; The backend uses Fastify and Redis to provide quick API responses. It also utilizes Solana on-chain data via Helius RPC provider.",
		image: MAEC,
		technologies: ["React", "SASS", "Web3", "Fastify"],
		url: "https://metaapeeliteclub.com/"
	},
	{
		name: "Dragon",
		description:
			"Unreleased web page and blog site for a Minecraft community built with React using Vite; It is optimized, responsive, and fits the Minecraft feel.",
		image: Dragon,
		technologies: ["React", "SCSS", "TypeScript", "PocketBase"]
	},
	{
		name: "My Blog",
		description:
			"A personal blog that goes more in-depth on how I started coding. It's also a proof of concept for my future blog website. Written in raw HTML and CSS because why not :)",
		image: Blog,
		technologies: ["HTML", "CSS"],
		github: "https://github.com/nobu-sh/about-me",
		url: "https://blog.nobu.sh/"
	},
	{
		name: "Plants Vs. Zombies VR",
		description:
			"Work in progress Plants Vs. Zombies built for VR. It is being developed in Unity 2019.4.31f1 LTS, there is no definite release date but it's in the works!",
		image: PVZ,
		technologies: ["C#", "Unity", "VR/AR", "Blender"]
	}
];

const projects: Array<Project> = [
	{
		name: "BeAPI",
		description:
			"A utility wrapper for Minecraft Bedrock Editions scripting API to make it easier to create TypeScript/JavaScript projects.",
		technologies: ["TypeScript", "Minecraft", "Transpiler"],
		github: "https://github.com/beapijs/beapi",
		url: "https://beapijs.github.io/beapi/"
	},
	{
		name: "mc-color",
		description:
			"A highly configurable VSCode extension that adds color formatting for the Minecraft color escape character §.",
		technologies: ["TypeScript", "Extension", "Format"],
		github: "https://github.com/nobu-sh/vscode-mc-color",
		url: "https://marketplace.visualstudio.com/items?itemName=Nobuwu.mc-color"
	},
	{
		name: "fine-tuned",
		description:
			"Work in progress music streaming library for Discord.JS. It supports a variety of filters and platforms. The API is just not exposed yet.",
		technologies: ["Discord.JS", "TypeScript", "FFmpeg"],
		github: "https://github.com/nobu-sh/fine-tuned"
	},
	{
		name: "djseed",
		description:
			"A utility library for multithreading your Discord bot. More useful utilities are still being added but it does what it advertises :)",
		technologies: ["Discord.JS", "TypeScript", "Sharding"],
		github: "https://github.com/nobu-sh/djseed",
		url: "https://nobu-sh.github.io/djseed/"
	},
	{
		name: "dotlang",
		description:
			"Parses .lang files and provides mapped results. Useful for internationalization or parsing a Minecraft language directory.",
		technologies: ["JavaScript", "NPM"],
		github: "https://github.com/nobu-sh/dotlang"
	},
	{
		name: "hueblocks",
		description:
			"Website for generating gradient block palettes for Minecraft. I didn't directly make this, I contributed a few features.",
		technologies: ["JQuery", "HTML", "CSS"],
		github: "https://github.com/1280px/hueblocks",
		url: "https://1280px.github.io/hueblocks/"
	}
];

function ProjectsSection() {
	const [showMore, setShowMore] = useState(false);
	const extraProjects = useRef<HTMLDivElement>(null);

	const processMaxHeight = useCallback(() => {
		if (!extraProjects.current) return;

		extraProjects.current.style.maxHeight = "0";
		extraProjects.current.style.maxHeight = `${extraProjects.current.scrollHeight}px`;
	}, []);

	// Calculate size on resize
	useEffect(() => {
		processMaxHeight();

		window.addEventListener("resize", processMaxHeight);
		return () => window.removeEventListener("resize", processMaxHeight);
	}, [processMaxHeight]);

	return (
		<section className="py-16 select-none" id="#projects">
			<h2 className="text-3xl text-center font-bold mb-1">
				Project <span className="text-accent">Spotlight</span>
			</h2>
			<p className="text-foreground-dim text-xl text-center">
				Some of the stuff I&apos;ve created.
			</p>
			<div className="grid grid-cols-1 lg:gap-16 gap-8 lg:mt-24 mt-8">
				{spotlightProjects.map((item, index) => (
					<SpotlightProject
						dir={index % 2 === 0 ? "start" : "end"}
						key={item.name}
						project={item}
					/>
				))}
			</div>
			<div className="lg:h-24 h-0" />
			<div
				ref={extraProjects}
				className={twMerge(
					"overflow-hidden transition-all duration-500 ease-in-out lg:pt-2 pt-4",
					!showMore && "!max-h-[0px]"
				)}
			>
				<div className="grid grid-cols-[repeat(auto-fill,minmax(21rem,1fr))] gap-6">
					{projects.map((item) => (
						<ExtraProject key={item.name} project={item} />
					))}
				</div>
				<div className="lg:h-24 h-16" />
			</div>
			<button
				className="show-more-button"
				type="button"
				onClick={() => setShowMore(!showMore)}
			>
				{showMore ? "show less" : "show more"}
			</button>
		</section>
	);
}

function SpotlightProject({
	project,
	dir
}: {
	project: SpotlightProject;
	dir: "start" | "end";
}) {
	return (
		<div
			className={twMerge(
				"grid gap-8 pb-8 grid-cols-2 lg:border-b-0 border-b border-b-foreground-dark last:border-b-0",
				dir === "start"
					? "lg:grid-cols-[1fr,50%] grid-cols-1"
					: "lg:grid-cols-[50%,1fr] grid-cols-1"
			)}
		>
			<div
				className={twMerge(
					"flex flex-col justify-center gap-4",
					dir === "start" ? "lg:order-1 order-2" : "lg:order-2 order-2"
				)}
			>
				<h3 className="text-2xl font-medium">{project.name}</h3>
				<p className="text-xl text-foreground-dim">{project.description}</p>
				<div className="flex flex-row gap-4 mt-2 flex-wrap">
					{project.technologies.map((item) => (
						<p
							className="text-base text-accent rounded-lg px-2 py-1 border border-accent"
							key={item}
						>
							{item}
						</p>
					))}
				</div>
				<div className="flex flex-row gap-4 flex-wrap h-6">
					{project.github && (
						<a
							className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
							href={project.github}
							rel="noreferrer"
							target="_blank"
						>
							<GitHubLogoIcon className="w-6 h-6" />
						</a>
					)}
					{project.url && (
						<a
							className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
							href={project.url}
							rel="noreferrer"
							target="_blank"
						>
							<GlobeIcon className="w-6 h-6" />
						</a>
					)}
				</div>
			</div>
			<div
				className={twMerge(
					dir === "start" ? "lg:order-2 order-1" : "lg:order-1 order-1"
				)}
			>
				<a
					className="inline-block"
					draggable={false}
					href={project.url ?? undefined}
					rel="noreferrer"
					target={project.url ? "_blank" : undefined}
				>
					<img
						alt={project.name}
						draggable={false}
						src={project.image}
						className={twMerge(
							"block lg:max-w-[90%] max-w-full h-auto saturate-[10%] hover:saturate-100 transition-all scale-100 hover:scale-105",
							dir === "start" ? "float-right" : "float-left"
						)}
					/>
				</a>
			</div>
		</div>
	);
}

function ExtraProject({ project }: { project: Project }) {
	return (
		<div className="border border-foreground-dark rounded-lg p-6 flex flex-col gap-4 transition-all hover:border-accent hover:text-accent hover:-translate-y-2">
			<div className="flex flex-row items-center">
				<h3 className="text-xl font-medium">{project.name}</h3>
				<div className="flex flex-row gap-2 flex-wrap h-6 ml-auto">
					{project.github && (
						<a
							className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
							href={project.github}
							rel="noreferrer"
							target="_blank"
						>
							<GitHubLogoIcon className="w-6 h-6" />
						</a>
					)}
					{project.url && (
						<a
							className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
							href={project.url}
							rel="noreferrer"
							target="_blank"
						>
							<GlobeIcon className="w-6 h-6" />
						</a>
					)}
				</div>
			</div>
			<p className="text-lg text-foreground-dim">{project.description}</p>
			<div className="flex flex-row gap-2 mt-1 flex-wrap">
				{project.technologies.map((item) => (
					<p
						className="text-base text-accent rounded-lg px-2 py-1 border border-accent"
						key={item}
					>
						{item}
					</p>
				))}
			</div>
		</div>
	);
}

function AboutSection() {
	return (
		<section className="py-16 select-none grid lg:grid-cols-2 grid-cols-1 gap-6">
			<div className="flex flex-col justify-center gap-6" id="#about">
				<h2 className="text-3xl text-left font-bold mb-1">
					About <span className="text-accent">Me</span>
				</h2>
				<p className="text-foreground-dim text-xl text-left">Heyo,</p>
				<p className="text-foreground-dim text-xl text-left">
					My name is <span className="text-accent">Nobu</span>, and I&apos;m a
					software developer located in East Moline, Illinois specializing in
					creating and designing high-quality websites and applications. I also
					ponder around with many other hobbies though like gamedev, 3d
					modeling, and pixel art.
				</p>
				<p className="text-foreground-dim text-xl text-left">
					Way back around the age of 10, I enjoyed using command blocks in
					Minecraft. This passion spiraled out of control from making addons for
					the game to learning multiple coding languages to creating full-stack
					applications and websites.
				</p>
				<p className="text-foreground-dim text-xl text-left">
					As of now, I am constantly working towards creating new things and
					expanding my knowledge with new technologies.
				</p>
				<div className="cool-contact-thing" id="#contact">
					<p>Contact Me :3</p>
				</div>
				<div className="flex flex-row gap-2 items-center h-6">
					<a
						className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
						href="mailto:chat@nobu.sh"
					>
						<AtSignIcon className="w-6 h-6" />
					</a>
					<a
						className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
						href="https://www.linkedin.com/in/nobu-sh/"
					>
						<LinkedInLogoIcon className="w-6 h-6" />
					</a>
					<a
						className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
						href="https://github.com/nobu-sh"
					>
						<GitHubLogoIcon className="w-6 h-6" />
					</a>
					<a
						className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
						href="https://t.me/nobu_sh"
					>
						<Telegram className="w-6 h-6" />
					</a>
					<a
						className="text-foreground-dark hover:text-foreground hover:rotate-6 transition-all"
						href="https://discord.com/users/316669053957832706"
					>
						<Discord className="w-[1.75rem] h-[1.75rem]" />
					</a>
				</div>
			</div>
			<div className="relative">
				<img
					alt="Nobu"
					className="float-right lg:max-w-[85%] h-auto block"
					draggable="false"
					src={Render}
				/>
				<div className="absolute top-0 left-0 w-full h-full silly-singleton-gradient" />
			</div>
		</section>
	);
}

function Footer() {
	return (
		<footer className="pt-16 pb-8 select-none flex md:flex-row flex-col md:items-center md:gap-4 gap-1">
			<p className="text-foreground-dark text-sm font-semibold">
				© nobu.sh 2024 - All Rights Reserved
			</p>
			<div className="flex flex-row items-center gap-4">
				<a
					className="flex flex-row gap-1 text-sm items-center text-accent"
					href="https://github.com/nobu-sh/nobu.sh"
				>
					<Github className="w-4 h-4" />
					<p>GitHub</p>
				</a>
				<a
					className="flex flex-row gap-1 text-sm items-center text-accent"
					href="https://github.com/nobu-sh/nobu.sh/archive/refs/heads/master.zip"
				>
					<Download className="w-4 h-4" />
					<p>Download</p>
				</a>
			</div>
		</footer>
	);
}
