import { SchemaTypeDefinition } from "sanity";

export const visualizationSchema: SchemaTypeDefinition = {
	name: "visualization",
	title: "Vizualization",
	type: "document",
	icon: () => "🗾",
	fields: [
		{
			type: "string",
			name: "name",
			title: "Name",
		},
		{
			type: "image",
			name: "image",
			title: "Image",
		},
	],
};
