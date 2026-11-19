
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { projects } from "@/components/project-data";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

async function ProjectPageContent({ params }) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

export default function ProjectPage({ params }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background text-foreground">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 lg:px-16">
            <div className="h-10 w-48 animate-pulse rounded bg-muted" />
            <div className="mt-8 h-[55vh] animate-pulse rounded-[2rem] bg-muted" />
          </div>
        </main>
      }
    >
      <ProjectPageContent params={params} />
    </Suspense>
  );
}
