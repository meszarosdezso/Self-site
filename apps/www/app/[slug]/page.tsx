import { PortableText } from "@portabletext/react";
import { client, Project } from "../../lib/sanity";
import { BackLink } from "../../components/BackLink";
import React from "react";
import { Asset } from "../../components/Asset";
import clsx from "clsx";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await client.fetch<Project>(
    `*[ _type == "work" && slug.current == $slug ][0]{
      title,
      description,
      date,
      "images": images[] {
        "asset": asset->,
        background
      },
      stack
    }`,
    { slug: slug }
  );

  return (
    <main className="pt-20 md:px-32 lg:px-16 px-8 text-sm text-white flex flex-col items-center justify-center min-h-screen">
      <section className="space-y-16 relative max-w-[720px]">
        <div className="space-y-4">
          <BackLink />

          <div className="flex mt-4 items-start justify-between">
            <h1 className="font-display text-2xl">{project.title}</h1>
            <span className="text-white/40 text-right whitespace-break-spaces">
              {project.date}
            </span>
          </div>
        </div>

        <div className="space-y-6 leading-6 text-white/80">
          <PortableText
            key="content"
            value={project.description}
            components={{
              marks: {
                pre: ({ children }) => (
                  <pre className="bg-white-5/40 p-4 rounded-lg">
                    {children as React.ReactNode}
                  </pre>
                ),
                link: ({ children, value }) => (
                  <a {...value} target="_blank" className="text-dirt">
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>

        <div className="space-y-8 text-center">
          {project.images?.map((image) => (
            <div
              key={image.asset._id}
              className={clsx(
                "relative w-full p-1 rounded-lg overflow-hidden ring-1 ring-midnight-10/50 bg-midnight-5 text-left flex justify-center",
                image.background && "max-h-[400px] bg-white py-8"
              )}
            >
              <Asset
                asset={image.asset}
                className="rounded-md overflow-hidden"
              />
            </div>
          ))}
        </div>
      </section>

      <ul className="space-y-0 flex justify-center items-center flex-wrap gap-6 py-20 group/stack text-sm">
        {project.stack?.map((tech) => (
          <li
            key={tech}
            className="text-white/40 group-hover/stack:text-white whitespace-nowrap cursor-default transition-all"
          >
            <span>{tech}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
