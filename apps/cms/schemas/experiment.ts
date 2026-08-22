import { SchemaTypeDefinition } from "sanity";

export const experimentSchema: SchemaTypeDefinition = {
	title: "Experiment",
	name: "experiment",
	type: "document",
	icon: () => "✨",
	fields: [
		{
			type: "string",
			name: "title",
			title: "Title",
		},
		{
			title: "Date",
			type: "date",
			name: "date",
		},
		{
			type: "string",
			name: "description",
			title: "Description",
		},
		{
			type: "file",
			name: "file",
			title: "File",
		},
		{
			type: "number",
			name: "order",
			hidden: true,
		},
	],
};
