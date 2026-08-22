import { client, type Photo } from "../../lib/sanity";
import { BackLink } from "../../components/BackLink";
import { Gallery } from "../../components/Gallery";

export default async function Page() {
	const photos = await client.fetch<Photo[]>(`
      *[ _type == 'photo' ] | order(image.asset->.metadata.exif.DateTimeOriginal desc) {
        title,
        "url": image.asset->.url,
        "meta": image.asset->.metadata {
          blurHash,
          lqip,
          exif {
            "date": DateTimeOriginal,
            "f": FNumber,
            "lens": LensModel,
            "shutterSpeed": ExposureTime,
            "focal": FocalLength,
            },
            dimensions,
        }
      }`);

	return (
		<main className={`px-2 text-white space-y-3 text-xs`}>
			<div className="fixed inset-x-0 top-0 p-5 z-10 bg-linear-to-b from-black/60 to-40% to-white/0">
				<BackLink />
			</div>

			<Gallery photos={photos} />
		</main>
	);
}
