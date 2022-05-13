import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import content from './content'
import bio from './bio'
import work from './work'
import viz from './viz'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([content, bio, work, viz]),
})
