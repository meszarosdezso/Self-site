import SanityClientConstructor from '@sanity/client'

const PROJECT_ID = 'p24wvwgb'

const sanity = SanityClientConstructor({
  apiVersion: '2022-05-10',
  dataset: 'production',
  projectId: PROJECT_ID,
  useCdn: true,
})

export default sanity
