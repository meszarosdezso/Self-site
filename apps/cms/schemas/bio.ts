import {SchemaTypeDefinition} from 'sanity'

export const bioSchema: SchemaTypeDefinition = {
  name: 'bio',
  type: 'document',
  title: 'Bio',
  icon: () => '🫠',
  fields: [
    {
      type: 'content',
      name: 'content',
      title: ' ',
    },
  ],
}
