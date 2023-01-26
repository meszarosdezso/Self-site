import { GetServerSideProps } from 'next'
import Gallery from '../../components/Gallery/Gallery'
import Layout from '../../components/Layout/Layout'
import { Photo } from '../../models/photo'
import { fetchPhotos } from '../../utils/api'
import styles from './Photos.module.scss'

interface Props {
  photos: Photo[]
}

export default function Page({ photos }: Props) {
  return (
    <div className={styles.PhotosPage}>
      <Layout title="Photos">
        <Gallery photos={photos} />
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
