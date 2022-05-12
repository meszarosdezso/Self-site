export default {
  name: 'visualization',
  title: 'Vizualization',
  type: 'document',
  icon: () => '🗾',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    }, 
    {
      type: 'image',
      name: 'image',
      title: 'Image',
    },
  ],
}
