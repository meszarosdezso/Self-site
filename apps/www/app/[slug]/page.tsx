import { PortableText } from "@portabletext/react";
import { client, Project } from "../../lib/sanity";
import { BackLink } from "../../components/BackLink";
import React from "react";
import { Asset } from "../../components/Asset";
import { notFound } from "next/navigation";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const project = await client.fetch<Project>(
    `*[ _type == "work" && slug.current == $slug ][0]{
      title,
      description,
      date,
      "images": images[].asset->
    }`,
    { slug: slug }
  );

  return (
    <main className="py-20 md:px-32 px-16 text-sm text-white flex items-center justify-center min-h-screen">
      <section className="space-y-16 relative w-[800px]">
        <div className="space-y-4">
          <BackLink />

          <div className="flex items-start justify-between">
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
            <div className="relative inline-flex p-1 rounded-lg overflow-hidden ring-1 ring-midnight-10/50 bg-midnight-5">
              <Asset
                asset={image}
                className="max-h-[400px] rounded-md overflow-hidden w-full"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
