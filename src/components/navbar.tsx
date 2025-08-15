import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function NavLink({
	to,
	children,
	noKewlLink = false,
	blank = false
}: {
	to: string;
	children: React.ReactNode;
	noKewlLink?: boolean;
	blank?: boolean;
}) {
	const location = useLocation();
	const isActive = `${location.pathname}${location.hash}` === to;

	if (blank) {
		return (
			<a
				className={twMerge(!noKewlLink && "kewl-link", isActive && "active")}
				href={to}
				rel="noopener noreferrer"
				target="_blank"
			>
				{children}
			</a>
		);
	}

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
						<span className="text-accent">nobu.sh</span>
						{/* <span className="text-foreground-dim animate-cursor">_</span> */}
					</h1>
				</NavLink>
				<div className="flex flex-row items-center gap-8 text-sm">
					<NavLink blank to="/desseyn_logan_resume_08_15_2025.pdf">
						Resume
					</NavLink>
					<NavLink to="/#contact">Contact Me</NavLink>
				</div>
			</div>
		</nav>
	);
}
