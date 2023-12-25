import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function NavLink({
	to,
	children,
	noKewlLink = false
}: {
	to: string;
	children: React.ReactNode;
	noKewlLink?: boolean;
}) {
	const location = useLocation();
	const isActive = `${location.pathname}${location.hash}` === to;

	return (
		<Link
			className={twMerge(!noKewlLink && "kewl-link", isActive && "active")}
			to={to}
			onClick={() => {
				// If the link is root scroll to top
				if (to === "/") {
					window.scrollTo({
						top: 0,
						behavior: "smooth"
					});
				}
			}}
		>
			{children}
		</Link>
	);
}

export default function Navbar() {
	return (
		<nav className="select-none sticky z-50 top-0 left-0 w-full h-full flex justify-center items-center px-clamp bg-background/80 backdrop-blur-sm">
			<div className="max-w-clamp w-full flex flex-row items-center justify-between">
				<NavLink noKewlLink to="/">
					<h1 className="text-foreground-dark font-bold text-2xl w-fit">
						{"~"} <span className="text-accent">NOBU</span>
						<span className="text-foreground-dim animate-cursor">_</span>
					</h1>
				</NavLink>
				<div className="flex flex-row items-center gap-8 text-sm">
					<NavLink to="/#projects">Projects</NavLink>
					<NavLink to="/#about">About</NavLink>
					<NavLink to="/#contact">#</NavLink>
				</div>
			</div>
		</nav>
	);
}
