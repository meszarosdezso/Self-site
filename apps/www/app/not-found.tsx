import { ProjectList } from "../components/ProjectList";
import { client } from "../lib/sanity";
import { redirect } from "next/navigation";

export default async function NotFoundPage() {
  async function handleChooseRandom() {
    "use server";

    const slugs = await client.fetch<string[]>(
      `*[ _type == "work" ] {
        "slug": slug.current,
      }.slug`
    );

    const index = Math.floor(Math.random() * slugs.length);
    const randomProject = slugs[index] ?? "copyfolio";

    redirect(`/${randomProject}`);
  }

  return (
    <main className="h-screen flex text-white bg-midnight md:items-center p-32 leading-8">
      <header className="space-y-8">
        <p className="text-white/60">
          This project doesn't exist yet.
          <br />
          <button
            type="button"
            className="text-dirt cursor-pointer"
            onClick={handleChooseRandom}
          >
            Check out a random one.
          </button>
        </p>
      </header>

      <ProjectList />
    </main>
  );
}
