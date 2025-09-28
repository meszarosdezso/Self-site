import React from "react";
import { client, Experiment } from "../../lib/sanity";
import { BackLink } from "../../components/BackLink";

export default async function Page() {
  const experiments = await client.fetch<
    Experiment[]
  >(`*[ _type == "experiment" ] | order(date desc) {
        "id": _id,
        title,
        "asset": file.asset->,
        date,
        description
    }`);

  return (
    <main className="text-white flex items-center justify-center h-screen">
      <div className="fixed z-10 left-0 px-14 md:px-0 py-20 md:py-0 top-0 md:left-32 md:top-24 space-y-2 text-sm bg-gradient-to-b from-midnight to-midnight/0 md:bg-none">
        <BackLink />
        <p className="text-sm text-white/60 leading-6 mt-2">
          Generative art experiments{" "}
          <i className="text-white/40 whitespace-nowrap not-italic">
            (and accidents)
          </i>
          <br />
          using Nannou and Processing.
        </p>
      </div>

      <div className="gap-10 fixed inset-0 flex md:flex-row flex-col overflow-y-auto md:overflow-y-hidden md:overflow-x-scroll py-64 md:p-32 w-full items-center">
        {experiments.map((experiment) => (
          <div
            key={experiment.id}
            className="size-[300px] md:size-[240px] relative overflow-hidden shrink-0 inline-flex rounded-lg ring-1 ring-midnight-10/50 bg-midnight-5/40"
          >
            {experiment.asset.mimeType.includes("image") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={experiment.asset.url} alt={experiment.title} />
            ) : (
              <video
                loop
                playsInline
                muted
                autoPlay
                src={experiment.asset.url}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
