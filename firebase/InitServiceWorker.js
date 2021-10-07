import dynamic from 'next/dynamic'

const registerServiceWorkerNoSSR = dynamic(() => import('../firebase/registerServiceWorker'), {
  ssr: false
})

export default () => <registerServiceWorkerNoSSR />