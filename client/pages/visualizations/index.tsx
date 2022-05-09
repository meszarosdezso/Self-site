import styles from './VisualizationsPage.module.scss'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout/Layout'
import Visualization from '../../models/viz'
import { fetchVisualizations } from '../../utils/api'
import Nav from '../../components/Nav/Nav'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Check, Copy } from 'react-feather'

const meta = {
  title: 'Visualizations',
  description:
    'Generative illustrations based on the public transport of Budapest.',
}

interface Props {
  visualizations: Visualization[]
}

type Size = '50_70' | '30_40' | '32_32' | '60_90'
type VizType = 'stops' | 'trips' | 'abstract'
type ImageFit = 'cover' | 'contain'

export default function VisualizationsPage({ visualizations }: Props) {
  const router = useRouter()

  const [size, setSize] = useState<Size>('50_70')
  const [bordered, setBordered] = useState(false)
  const [light, setLight] = useState(true)
  const [fit, setFit] = useState<ImageFit>('cover')
  const [selected, setSelected] = useState<VizType | null>(null)

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const rawData = router.query['code'] as string

    if (rawData) {
      const data = Buffer.from(rawData, 'hex').toString()
      const [selected, size, bordered, fit, light] = data.split(';')
      setSize(size as Size)
      setBordered(bordered === 'true')
      setSelected(selected === 'null' ? null : (selected as VizType))
      setFit(fit as ImageFit)
      setLight(light === 'true')
    }
  }, [router.query])

  useEffect(() => {
    const key = createConfigKey()
    if (router.query['code'] !== key) {
      router.replace({ query: { code: key } }, undefined, { shallow: true })
    }
  }, [size, bordered, selected, fit, light])

  const createConfigKey = useCallback(() => {
    return Buffer.from(
      `${selected};${size};${bordered};${fit};${light}`
    ).toString('hex')
  }, [size, bordered, selected, fit])

  return (
    <Layout {...meta}>
      <div id={styles.VisualizationsPage}>
        <Nav hideMenu />
        <header>
          <h1>{meta.title}</h1>
          <p className={`sans ${styles.description}`}>{meta.description}</p>
        </header>

        <h2>Costumize your print</h2>
        <br />
        <div className={styles.config}>
          <div className={styles['option-picker']}>
            <span
              onClick={_ => setFit('cover')}
              className={fit === 'cover' ? styles.active : ''}
            >
              cover
            </span>
            <span
              onClick={_ => setFit('contain')}
              className={fit === 'contain' ? styles.active : ''}
            >
              fit
            </span>
          </div>
          <div className={styles['option-picker']}>
            <span
              onClick={_ => setBordered(true)}
              className={bordered ? styles.active : ''}
            >
              framed
            </span>
            <span
              onClick={_ => setBordered(false)}
              className={!bordered ? styles.active : ''}
            >
              print only
            </span>
          </div>
          <div className={styles['option-picker']}>
            {['60_90', '50_70', '30_40', '32_32'].map(s => (
              <div
                className={size === s ? styles.active : ''}
                onClick={_ => setSize(s as Size)}
                key={s}
              >
                {s.split('_').join(' cm x ')} cm
              </div>
            ))}
          </div>
          <div className={styles['option-picker']}>
            <span
              onClick={_ => setLight(true)}
              className={light ? styles.active : ''}
            >
              light
            </span>
            <span
              onClick={_ => setLight(false)}
              className={!light ? styles.active : ''}
            >
              dark
            </span>
          </div>
        </div>

        <h2>Select the one you like</h2>

        <section className={styles['visualization-cards']}>
          {visualizations.map(viz => (
            <div
              key={viz.slug}
              onClick={_ => setSelected(viz.slug as VizType)}
              className={`${styles.VisualizationCard} ${styles['x' + size]} ${
                bordered ? styles.bordered : ''
              } ${selected === viz.slug ? styles.active : ''} ${
                !light ? styles.dark : ''
              }`}
              style={{
                opacity: selected !== null && selected !== viz.slug ? 0.4 : 1,
              }}
            >
              <div
                style={{
                  width: fit === 'contain' ? '100%' : '',
                  height:
                    fit === 'cover'
                      ? size === '32_32'
                        ? '140%'
                        : '110%'
                      : '100%',
                }}
                className={styles.preview}
              >
                <img
                  style={{
                    objectFit: fit,
                    objectPosition:
                      fit === 'contain' ? '' : size === '32_32' ? '35%' : '15%',
                  }}
                  src={`/assets/visualizations/${viz.slug}.png`}
                  alt={viz.title}
                />
              </div>

              <div className={styles.details}>
                <h3>{viz.title}</h3>
              </div>
            </div>
          ))}
        </section>

        <p className={`sans ${styles['finish-comment']}`}>
          If you're happy with your config, send me the URL of the page! <br />
          <br />
          <button
            onClick={_ => {
              navigator.clipboard
                .writeText(location.href)
                .then(_ => {
                  setCopied(true)
                  setTimeout(() => {
                    setCopied(false)
                  }, 2000)
                })
                .catch(console.error)
            }}
          >
            {!copied ? <Copy /> : <Check />}
            {copied ? 'Copied' : 'Copy'} to clipboard
          </button>
        </p>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const visualizations = await fetchVisualizations()

  return {
    props: {
      visualizations,
    },
  }
}
