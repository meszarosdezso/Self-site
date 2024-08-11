import { ProjectList } from "../components/ProjectList";
import { Title } from "../components/Title";
import { client, Project } from "../lib/sanity";
import { Socials } from "../components/Socials";

const customProjects: Project[] = [
  {
    id: "photos",
    slug: "photos",
    title: "Photography",
    image: {
      extension: "jpg",
      url: "https://cdn.sanity.io/images/p24wvwgb/production/f90027f038de6e0810bfa12da1334bf31ce43fdf-3240x2160.jpg",
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

export default async function Page() {
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
    <main className="relative snap-mandatory snap-y overflow-y-auto h-screen text-white">
      <div
        style={{
          background: `linear-gradient(0deg, #0a0a0a 20%, #0a0a0a00 48%, #0a0a0a00 52%, #0a0a0a 80%)`,
        }}
        className="fixed hidden md:block inset-0 pointer-events-none z-20"
      />

      <div className="fixed text-xs inset-x-12 bottom-10 md:inset-x-12 text-right md:bottom-10 text-white/20 z-20">
        Dezso Meszaros, {new Date().getFullYear()}
      </div>

      <div className="space-y-10 py-[calc(50vh_-_100px)] text-white/60 hidden md:block">
        <Snapper>
          <Title />
        </Snapper>
        <Snapper>
          <Socials />
        </Snapper>
      </div>

      <div className="md:hidden absolute left-14 top-14">
        <Title />
      </div>

      <ProjectList projects={projects} />
    </main>
  );
}

function Snapper({ children }: React.PropsWithChildren) {
  return (
    <div className="size-[200px] flex items-center justify-center snap-always snap-center ring-0 ring-dirt">
      <div className="absolute left-32 max-w-[400px]">{children}</div>
    </div>
  );
}
