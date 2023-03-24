import { GradientTitle } from '../components/GradientTitle/GradientTitle'
import Layout from '../components/Layout/Layout'

export default function Page() {
  return (
    <Layout hideFooter title="Nothing to see here">
      <main id="fourohfour">
        <GradientTitle className="sans">404</GradientTitle>
      </main>
    </Layout>
  )
}
