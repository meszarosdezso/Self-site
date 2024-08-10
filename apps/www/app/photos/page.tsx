import { client, Photo } from "../../lib/sanity";
import { SanityImage } from "../../components/Image";
import { DateTime } from "luxon";

function split<T>(array: T[], into: number = 2): T[][] {
  const result: T[][] = Array.from({ length: into }, () => []);
  array.forEach((item, i) => {
    result[i % into]?.push(item);
  });

  return result;
}

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
            "shutter": round(1 / ExposureTime),
            "focal": FocalLength,
            },
            dimensions,
        }
      }`);

  const columns = split(photos, 3);

  return (
    <main className="p-2 text-white text-xs">
      <div className="grid grid-cols-3 gap-2">
        {columns.map((column, i) => (
          <div key={`photos-col-${i}`} className="flex flex-col gap-2">
            {column.map((photo) => (
              <div key={photo.url} className="relative group/photo">
                <SanityImage photo={photo} />

                <div className="absolute opacity-0 pointer-events-none translate-x-4 group-hover/photo:translate-x-0 transition-all group-hover/photo:opacity-100 text-right inset-0 flex justify-between items-end flex-col p-8">
                  <span>{photo.title}</span>

                  <ul className="space-y-2">
                    <li>{photo.meta.exif?.focal}mm</li>
                    <li>F{photo.meta.exif?.f}</li>
                    <li>1/{photo.meta.exif?.shutter}</li>
                  </ul>

                  <span>
                    {DateTime.fromISO(photo.meta.exif?.date).toFormat(
                      "MMMM yyyy"
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
