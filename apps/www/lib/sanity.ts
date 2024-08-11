import { PortableTextBlock } from "@portabletext/react";
import { createClient, SanityImageAssetDocument } from "@sanity/client";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  dataset: "production",
  projectId: "p24wvwgb",
  apiVersion: "2024-08-09",
  useCdn: true,
});

export type Project = {
  id: string;
  title: string;
  description: PortableTextBlock[];
  date: string;
  image: SanityAsset;
  images: SanityAsset[];
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

export type Experiment = {
  id: string;
  title: string;
  description: string;
  asset: SanityAsset;
};
