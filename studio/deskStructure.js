import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .id('main')
    .title('🫠')
    .items([
      S.listItem()
        .id('bio')
        .title('Bio')
        .icon(() => '🥹')
        .child(S.document().schemaType('bio').documentId('bio').title('Bio')),
      ...S.documentTypeListItems().filter(
        doc => !['bio'].includes(doc.getId())
      ),
    ])
