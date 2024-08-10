import { createClient, SanityImageAssetDocument } from "@sanity/client";

export const client = createClient({
  dataset: "production",
  projectId: "p24wvwgb",
  apiVersion: "2024-08-09",
  useCdn: true,
});

export type Project = {
  id: string;
  title: string;
  image: string;
  slug: string;
};

export type Photo = {
  title: string;
  url: string;
  meta: Pick<
    SanityImageAssetDocument["metadata"],
    "blurHash" | "exif" | "dimensions" | "lqip"
  >;
};
