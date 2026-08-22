import { SchemaTypeDefinition } from "sanity";

export const photoSchema: SchemaTypeDefinition = {
	type: "document",
	name: "photo",
	title: "Photo",
	icon: () => "📷",
	fields: [
		{
			type: "string",
			name: "title",
			title: "Title",
		},
		{
			type: "image",
			name: "image",
			title: "Photo",
			options: {
				metadata: ["blurhash", "palette", "exif", "location", "lqip"],
			},
		},
		{
			type: "geopoint",
			name: "location",
			title: "Location",
			description: "The location of the photo",
		},
		{
			type: "number",
			name: "order",
			hidden: true,
		},
	],
};
