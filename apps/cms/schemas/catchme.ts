import {SchemaTypeDefinition} from 'sanity'

export const catchmeSchema: SchemaTypeDefinition = {
  name: 'catchme',
  type: 'document',
  title: 'Catch Me',
  icon: () => '🚍',
  fields: [
    {
      title: 'How to play',
      name: 'instructions',
      type: 'content',
    },
  ],
}
