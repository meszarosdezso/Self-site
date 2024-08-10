import { ProjectList } from "../components/ProjectList";
import { Title } from "../components/Title";
import { client, Project } from "../lib/sanity";

const customProjects: Project[] = [
  {
    id: "photos",
    slug: "photos",
    title: "Photography",
    image:
      "https://cdn.sanity.io/images/p24wvwgb/production/f90027f038de6e0810bfa12da1334bf31ce43fdf-3240x2160.jpg",
  },
  {
    id: "experiments",
    slug: "#experiments",
    title: "Accidents",
    image:
      "https://cdn.sanity.io/files/p24wvwgb/production/1a21ab3019acb26f0715096c5024ced4d31c8bda.gif",
  },
];

export default async function Page() {
  const sanityProjects: Project[] =
    await client.fetch(`*[ _type == "work" ] | order(date desc) {
      "id": _id,
      title,
      "image": images[0].asset->.url,
      "slug": slug.current,
    }`);

  const projects = [...sanityProjects, ...customProjects];

  return (
    <main className="relative snap-mandatory snap-y overflow-y-auto selection:text-dirt h-screen selection:bg-none text-white">
      {/* <div className="fixed w-56 h-1 bg-dirt top-1/2 -translate-y-1/2 left-0"></div> */}

      <div
        style={{
          background: `linear-gradient(0deg, #000 20%, #0000 48%, #0000 52%, #000 80%)`,
        }}
        className="fixed inset-0 pointer-events-none z-20"
      />

      <div className="space-y-10 py-[calc(50vh_-_100px)] text-white/60">
        <Snapper>
          <Title />
        </Snapper>
        <Snapper>
          <p className="absolute left-32 max-w-[400px]">
            You can find some of my <span className="text-dirt">photos</span>.
          </p>
        </Snapper>
        <Snapper />
        <Snapper />
        <Snapper />
      </div>

      <ProjectList projects={projects} />
    </main>
  );
}

function Snapper({ children }: React.PropsWithChildren) {
  return (
    <div className="size-[200px] flex items-center justify-center snap-always snap-center ring-0 ring-dirt">
      {children}
    </div>
  );
}
