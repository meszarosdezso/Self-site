"use client";

import { DateTime } from "luxon";
import { Photo } from "../lib/sanity";
import { split } from "../utils/array";
import { SanityImage } from "./Image";

type GalleryProps = {
  photos: Photo[];
};

export function Gallery({ photos }: GalleryProps) {
  const columnCount =
    typeof window === "undefined" ? 2 : Math.floor(window.innerWidth / 400);
  const columns = split(photos, columnCount);

  return (
    <div className="flex gap-2">
      {columns.map((column, i) => (
        <div key={`photos-col-${i}`} className="flex flex-col gap-2">
          {column.map((photo) => (
            <div key={photo.url} className="relative group/photo">
              <SanityImage photo={photo} />

              <div className="absolute backdrop-blur-sm opacity-0 pointer-events-none translate-x-4 group-hover/photo:translate-x-0 transition-all group-hover/photo:opacity-100 text-right inset-0 flex justify-between items-end flex-col p-8">
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
  );
}
