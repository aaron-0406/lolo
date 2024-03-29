import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import Breadcrumbs from '@/ui/Breadcrumbs'
import Container from '@/ui/Container'
import PermissionsActions from './PermissionsActions'
import PermissionsTable from './PermissionsTable'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import paths from 'shared/routes/paths'

const DashboardPermissions = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const code = searchParams.get('code')

  const formMethods = useForm<{ routers: LinkType[] }>({
    defaultValues: {
      routers: [
        {
          link: paths.dash.permisos,
          name: 'Permisos',
        },
      ],
    },
  })

  const setBreadCrumbs = () => {
    const links: LinkType[] = [
      {
        link: paths.dash.permisos,
        name: 'Permisos',
      },
    ]
    let link = ''
    for (let i = 0; code !== null && i < code.length; i++) {
      link += code[i]
      if (link.length % 3 === 0) {
        links.push({
          link: `${paths.dash.permisos}?code=${link}`,
          name: link,
        })
      }
    }
    formMethods.setValue('routers', links)
  }

  useEffect(() => {
    setBreadCrumbs()
    // eslint-disable-next-line
  }, [code])

  return (
    <FormProvider {...formMethods}>
      <Container
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <PermissionsActions />
        <Breadcrumbs routes={formMethods.watch('routers')} />
        <PermissionsTable />
      </Container>
    </FormProvider>
  )
}

export default DashboardPermissions
