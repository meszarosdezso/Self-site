import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'meszarosdezso',

  projectId: 'p24wvwgb',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: (prev) => {
      // TODO single bio schema
      return [...prev, ...(schemaTypes.filter((schema) => ![''].includes(schema.name)) as any)]
    },
  },
})
