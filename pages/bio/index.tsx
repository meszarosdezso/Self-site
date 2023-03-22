import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import Social from '../../components/Social/Social'
import { fetchBioPage } from '../../utils/api'
import { rangeMap } from '../../utils/math'
import styles from './Bio.module.scss'
import { PortableText } from '@portabletext/react'
import { TITLE_BASE } from '../../constants/meta'
import Layout from '../../components/Layout/Layout'
import Nav from '../../components/Nav/Nav'
import { GradientTitle } from '../../components/GradientTitle/GradientTitle'

type BioProps = {
  bio: any[]
}

const BioPage: React.FC<BioProps> = ({ bio }) => {
  const [headerOpacity, setHeaderOpacity] = useState(1)

  useScrollPosition(
    ({ currPos: { y } }) => {
      if (-y <= window.innerHeight / 2)
        setHeaderOpacity(1 - -y / (window.innerHeight / 2))
    },
    [headerOpacity]
  )

  const title = `Biography | ${TITLE_BASE}`

  return (
    <Layout title={title}>
      <Nav hideMenu />
      <div className="page">
        <div id={styles.BioPage}>
          <div className={styles.content}>
            <header
              style={{
                opacity: headerOpacity,
              }}
            >
              <GradientTitle>Biography</GradientTitle>
            </header>
            <div
              style={{ opacity: rangeMap(headerOpacity, 1, 0, 0, 1) }}
              className={styles.text}
            >
              <PortableText value={bio} />
            </div>
            <Social />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BioPage

export const getStaticProps: GetStaticProps = async () => {
  const bio = await fetchBioPage()

  return {
    props: {
      bio,
    },
  }
}
