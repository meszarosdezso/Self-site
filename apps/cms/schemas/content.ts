import {SchemaTypeDefinition} from 'sanity'

export const contentSchema: SchemaTypeDefinition = {
  title: 'Content',
  name: 'content',
  type: 'array',
  of: [{type: 'block'}, {type: 'image'}],
}
