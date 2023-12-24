import Page from "@/components/page";

export default function MainPage() {
	return (
		<Page>
			<TopSection />
			<ProjectsSection />
		</Page>
	);
}

function TopSection() {
	return (
		<section className="h-full">
			<p>Top Section</p>
		</section>
	);
}

function ProjectsSection() {
	return (
		<section>
			<p>Projects</p>
		</section>
	);
}
