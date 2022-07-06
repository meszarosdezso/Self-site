export const sizedImage = (url: string, width: number) =>
  url.replace('upload', 'upload/w_' + width)
