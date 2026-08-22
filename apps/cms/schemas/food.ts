import { SchemaTypeDefinition } from "sanity";

export const foodSchema: SchemaTypeDefinition = {
	title: "Food",
	name: "food",
	type: "document",
	icon: () => "🍕",
	fields: [
		{
			type: "string",
			name: "name",
			title: "Name",
		},
		{
			type: "array",
			name: "images",
			title: "Images",
			of: [{ type: "image" }],
		},
		{
			type: "number",
			name: "order",
		},
	],
	preview: {
		select: {
			title: "name",
			media: "images.0.asset",
		},
	},
};
