import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LayoutDocuments from '../../../../components/Layouts/LayoutDocuments'
import { TemplateFormType } from './hookforms.interfaces'
import TemplateActions from './TemplateActions'
import TemplateDoc from './TemplateDoc'
import TemplateInfo from './TemplateInfo'
import TemplateTable from './TemplateTable'
import TemplateUsersTable from './TemplateUsersTable'

const ExtrajudicialTemplate = () => {
  const formMethods = useForm<TemplateFormType>({
    mode: 'all',
    defaultValues: {
      templates: [],
      templateSelected: {
        id: 0,
        name: '',
        customerId: 0,
        templateJson: '',
        templatePhoto: '',
      },
      templateHasValuesSelected: {
        id: 0,
        name: '',
        templateId: 0,
      },
      templateHasValues: [],
      fields: [],
      values: [],
      templateJson: { parrafos: [] },
      templatePhoto: '',
      clients: [],
      clientSelected: {},
    },
  })
  return (
    <FormProvider {...formMethods}>
      <LayoutDocuments
        firstChild={<TemplateTable />}
        actions={<TemplateActions />}
        info={<TemplateInfo />}
        users={<TemplateUsersTable />}
        doc={<TemplateDoc />}
      />
    </FormProvider>
  )
}

export default ExtrajudicialTemplate
