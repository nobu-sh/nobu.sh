import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import Navbar from "./navbar";

export type PageProps = HTMLAttributes<HTMLDivElement>;

const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
	{ className, children, ...props },
	reference
) {
	return (
		<div
			ref={reference}
			className={twMerge(
				"grid grid-rows-[5rem,1fr] w-screen min-h-screen",
				className
			)}
			{...props}
		>
			<Navbar />
			<div className="h-full w-full flex justify-center px-clamp">
				<div className="max-w-clamp w-full">{children}</div>
			</div>
		</div>
	);
});
Page.displayName = "Page";

export default Page;
