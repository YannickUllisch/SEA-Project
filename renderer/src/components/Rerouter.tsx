import { useRouter } from 'next/router'
import { useEffect, type FC, type PropsWithChildren } from 'react'
import { useSession } from './SessionProvider'
import { publicRoutes } from '@renderer/routes'

const Rerouter: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const session = useSession()

  // Reroutes unauthenticated users from all non public routes
  useEffect(() => {
    if (!session && !publicRoutes.includes(router.pathname)) {
      router.push('/')
    }
  }, [session, router.pathname, router.push])
  return <>{children}</>
}

export default Rerouter
