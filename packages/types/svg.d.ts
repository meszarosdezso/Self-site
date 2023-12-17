declare module '*.svg' {
  const Component: React.FunctionComponent<
    React.ComponentPropsWithoutRef<'svg'>
  >

  // eslint-disable-next-line import/no-default-export
  export default Component
}
