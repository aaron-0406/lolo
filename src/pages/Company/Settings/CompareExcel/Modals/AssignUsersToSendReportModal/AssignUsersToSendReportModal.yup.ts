import { CompareResponse, CompareExcelsUserType } from '@/types/config/compare-excels.type'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


const AssingUserToSendReportSchema : yup.SchemaOf<{ fileData: CompareResponse, users: CompareExcelsUserType[] }> = yup.object().shape({
    fileData: yup.object().shape({
        fileName: yup.string().required(),
        fileSize: yup.string().required(),
    }),
    users: yup.array().of(yup.object().shape({
        id: yup.number().required(),
        name: yup.string().required(),
        lastName: yup.string().required(),
        phone: yup.string().optional(),
        dni: yup.string().optional(),
        email: yup.string().required(),
        state: yup.boolean().optional(),
    }))
})


export const ModalAssingUserToSendReportResolver = yupResolver(AssingUserToSendReportSchema)
