import {bioSchema} from './bio'
import {catchmeSchema} from './catchme'
import {contentSchema} from './content'
import {experimentSchema} from './experiment'
import {photoSchema} from './photo'
import {visualizationSchema} from './visualization'
import {workSchema} from './work'

export const schemaTypes = [
  contentSchema,
  bioSchema,
  catchmeSchema,
  visualizationSchema,
  photoSchema,
  workSchema,
  experimentSchema,
]
