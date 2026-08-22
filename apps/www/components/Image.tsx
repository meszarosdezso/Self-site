"use client";

import Image from "next/image";
import { Photo } from "../lib/sanity";

export function SanityImage({ photo }: { photo: Photo }) {
	return (
		<Image
			src={photo.url}
			alt={photo.title}
			width={photo.meta.dimensions.width}
			height={photo.meta.dimensions.height}
			loading="lazy"
			loader={({ src }) => {
				return `${src}?w=800`;
			}}
			placeholder={photo.meta.lqip ? "blur" : "empty"}
			blurDataURL={photo.meta.lqip}
			className="w-full h-full group-hover/photo:saturate-0 transition-all group-hover/photo:brightness-50"
		/>
	);
}
