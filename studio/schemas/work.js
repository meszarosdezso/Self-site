export default {
  title: 'Work',
  name: 'work',
  type: 'document',
  icon: () => '🤓',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    },
    {
      title: 'Date',
      type: 'string',
      name: 'date',
    },
    {
      title: 'URL',
      type: 'url',
      name: 'url',
    },
    {
      type: 'array',
      name: 'tags',
      title: 'Tags',
      of: [{ type: 'string' }],
    },
    {
      type: 'string',
      name: 'short_description',
      title: 'Short description',
    },
    {
      type: 'content',
      name: 'description',
      title: 'Description',
    },
    {
      title: 'Images',
      name: 'images',
      description: 'The first will be used as cover image!',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      type: 'array',
      name: 'stack',
      title: 'Technologies used',
      of: [{ type: 'string' }],
    },
    {
      type: 'number',
      name: 'order',
      hidden: true,
    },
  ],
}
