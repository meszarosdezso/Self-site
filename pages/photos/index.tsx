import { GetServerSideProps } from 'next'
import Gallery from '../../components/Gallery/Gallery'
import Layout from '../../components/Layout/Layout'
import { Photo } from '../../models/photo'
import { fetchPhotos } from '../../utils/api'
import styles from './Photos.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCamera,
  faLaptop,
  faMobilePhone,
} from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/Footer/Footer'

interface Props {
  photos: Photo[]
}

export default function Page({ photos }: Props) {
  return (
    <div className={styles.PhotosPage}>
      <Layout title="Photos" hideFooter>
        <Gallery photos={photos} />

        <div className={`${styles.gear} sans`}>
          {/* <h4>Behind the pictures</h4>   */}

          <ul>
            <div>
              <li>
                <FontAwesomeIcon width={'.9em'} icon={faCamera} />
              </li>
              <li>Canon EOS 80D</li>
              <li>Sigma Art 18-35mm F1.8</li>
              <li>Sigma Art 50-100mm F1.8</li>
              <li>Helios 44m F2</li>
            </div>
            <div>
              <li>
                <FontAwesomeIcon id={styles.phoneIcon} icon={faMobilePhone} />
              </li>
              <li>iPhone 14 Pro Max</li>
              <li>Lightroom Mobile</li>
            </div>
            <div>
              <li>
                <FontAwesomeIcon width={'.95em'} icon={faLaptop} />
              </li>
              <li>Macbook Pro 13" 2021</li>
              <li>Lightroom CC</li>
            </div>
          </ul>
          <Footer noPadding hideGithub />
        </div>
      </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const photos = await fetchPhotos()

  return {
    props: { photos },
  }
}
