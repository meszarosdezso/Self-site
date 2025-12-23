import { ProjectList } from "../components/ProjectList";
import { Title } from "../components/Title";
import { Socials } from "../components/Socials";
import { ArrowRight } from "react-feather";
import Link from "next/link";
import clsx from "clsx";
import { ReadMoreLink } from "../components/ReadMoreLink";

export default async function Page() {
  return (
    <main className="relative snap-mandatory snap-y overflow-y-auto h-screen text-white">
      <div
        style={{
          scrollTimeline: "--idk y",
          background: `linear-gradient(0deg, #0a0a0a 25vh, #0a0a0a00 45vh, #0a0a0a00 55vh, #0a0a0a 75vh)`,
        }}
        className="fixed hidden md:block inset-0 pointer-events-none z-20"
      />

      <h1
        title={`Dezso Meszaros, ${new Date().getFullYear()}`}
        className="fixed text-xs inset-x-12 bottom-10 md:inset-x-12 text-right md:bottom-10 text-white/20 z-20"
      >
        Dezso Meszaros, {new Date().getFullYear()}
      </h1>

      <div className="space-y-10 py-[calc(50vh-100px)] text-white/60 hidden md:block">
        <Snapper>
          <Title />
        </Snapper>
        <Snapper>
          <p className="text-xl leading-8 text-dirt selection:bg-dirt selection:text-midnight">
            Building products with TypeScript for 7+ years,
            with a strong passion for UX and interaction design.{" "}
            {/* <ReadMoreLink /> */}
          </p>
        </Snapper>
        <Snapper>
          <Socials />
        </Snapper>
      </div>

      <div className="md:hidden absolute left-14 top-14">
        <Title />
      </div>

      <ProjectList />
    </main>
  );
}

function Snapper({ children }: React.PropsWithChildren) {
  return (
    <div className="size-[200px] flex items-center justify-center snap-always snap-center ring-0 ring-dirt">
      <div className="absolute left-32 max-w-[420px]">{children}</div>
    </div>
  );
}
