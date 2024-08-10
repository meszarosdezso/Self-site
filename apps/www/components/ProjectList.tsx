import Link from "next/link";
import { Project } from "../lib/sanity";

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="fixed bottom-12 z-20 md:bottom-[unset] right-12 flex group/projects md:right-6 pl-16 pr-6 py-6 md:top-1/2 md:hover:bg-midnight-5 md:hover:ring-1 transition-all ring-midnight-10 rounded-lg flex-col flex-nowrap items-end md:-translate-y-1/2">
      {projects.map((project, i) => (
        <div
          key={project.title}
          className="group/project transition-all py-4 md:py-2 group-hover/projects:py-4 w-full flex justify-end cursor-pointer"
        >
          <Link href={project.slug}>
            <div
              style={{
                width: `${project.title.length * 7}px`,
                animationDelay: `${i * 0.06 + 1.6}s`,
              }}
              className="h-1 opacity-0 animate-slide-in-right rounded-full md:scale-75 origin-right group-hover/projects:scale-100 group-hover/projects:w-0 transition-all md:bg-white/40 w-20 group-hover/projects:bg-white/0"
            >
              <span className="text-sm text-right text-white/60 group-hover/project:text-dirt whitespace-nowrap absolute right-0 top-1/2 -translate-y-1/2 transition-all origin-right md:scale-90 md:opacity-0 group-hover/projects:opacity-100 group-hover/projects:scale-100">
                {project.title}
              </span>
            </div>
          </Link>

          <div className="absolute w-max h-full opacity-0 bg-midnight-5 p-1 right-full pointer-events-none md:group-hover/project:opacity-100 transition-all -translate-x-4 -translate-y-1/2 top-1/2 rounded-lg ring-1 ring-midnight-10 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full rounded-md"
              src={project.image}
              alt={project.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
