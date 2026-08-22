import { Cobe } from "../../components/Cobe";
import { client } from "../../lib/sanity";

export default async function Page() {
	const locations: {
		location: {
			lat: number;
			lng: number;
		};
		title: string;
	}[] = await client.fetch(
		`*[ _type == "photo" ] | order(image.asset->.metadata.exif.DateTimeOriginal desc) {
        "location": coalesce(image.asset->.metadata.location, @.location),
        title,
    }`,
	);

	return (
		<div className="text-gold h-screen w-screen flex items-center justify-center">
			<Cobe locations={locations.map((location) => location.location)} />

			<p className="absolute text-xs text-white/20 bottom-8">
				created with{" "}
				<a href="https://cobe.vercel.app/" className="underline">
					Cobe
				</a>{" "}
				by{" "}
				<a href="https://shud.in" className="underline">
					@shuding
				</a>
			</p>
		</div>
	);
}
