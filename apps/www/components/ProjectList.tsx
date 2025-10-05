import Link from "next/link";
import { client, Project } from "../lib/sanity";
import { Asset } from "./Asset";

const customProjects: Project[] = [
  {
    id: "photos",
    slug: "photos",
    title: "Photography",
    image: {
      extension: "jpg",
      url: "https://cdn.sanity.io/images/p24wvwgb/production/873c27b84d3a1b96a52a478be8b0b2858efe0d5b-1440x1080.jpg?w=800",
    },
    date: "",
    description: [],
    images: [],
  },
  {
    id: "experiments",
    slug: "experiments",
    title: "Generative art",
    image: {
      extension: "gif",
      url: "https://cdn.sanity.io/files/p24wvwgb/production/1a21ab3019acb26f0715096c5024ced4d31c8bda.gif",
    },
    images: [],
    description: [],
    date: "",
  },
];

export async function ProjectList() {
  const sanityProjects: Project[] =
    await client.fetch(`*[ _type == "work" ] | order(date desc) {
    "id": _id,
    title,
    "image": select(
      cover != null => cover,
      images[0] != null => images[0]
    ).asset->,
    "slug": slug.current,
  }`);

  const projects = [...sanityProjects, ...customProjects];

  return (
    <div className="fixed bottom-20 z-20 md:bottom-[unset] right-6 flex group/projects pl-6 pr-6 py-6 md:top-1/2 md:hover:bg-midnight-5/40 md:hover:ring-1 transition-all ring-midnight-10/50 rounded-lg flex-col flex-nowrap items-end md:-translate-y-1/2">
      {projects.map((project, i) => (
        <Link
          key={project.title}
          href={project.slug === "www" ? "/" : project.slug}
          className="group/project py-4 md:py-2 group-hover/projects:py-4 pl-10 transition-all w-full flex justify-end cursor-pointer"
        >
          <div
            style={{
              width: `${project.title.length * 7}px`,
              animationDelay: `${i * 0.06 + 1}s`,
            }}
            className=" w-full h-1 opacity-0 animate-fade-in flex justify-end rounded-full md:scale-75 origin-right group-hover/projects:scale-100 group-hover/projects:w-0 transition-all md:bg-white/40 group-hover/projects:bg-white/0"
          >
            <span className="text-sm text-right text-white/60 group-hover/project:text-dirt whitespace-nowrap md:absolute right-0 top-1/2 -translate-y-1/2 transition-all origin-right md:scale-90 md:opacity-0 group-hover/projects:opacity-100 group-hover/projects:scale-100">
              {project.title}
            </span>
          </div>

          <div className="absolute w-max h-full opacity-0 backdrop-blur-sm bg-midnight-5/40 p-1 right-full pointer-events-none md:group-hover/project:opacity-100 transition-all -translate-x-4 -translate-y-1/2 top-1/2 rounded-lg ring-1 ring-midnight-10/50 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Asset
              asset={project.image}
              alt={project.title}
              className="rounded-md h-full"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
