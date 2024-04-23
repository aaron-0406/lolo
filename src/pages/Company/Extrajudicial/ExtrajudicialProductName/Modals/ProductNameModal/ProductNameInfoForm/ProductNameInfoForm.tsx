import { Controller, useFormContext } from 'react-hook-form'
import { ExtProductNameType } from '@/types/extrajudicial/ext-product-name'
import TextField from '@/ui/fields/TextField'

const ProductNameInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtProductNameType>()

  return (
    <>
      <Controller
        name="productName"
        control={control}
        render={({ field }) => (
          <TextField
            label="Nombre de producto"
            width="100%"
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.productName}
          />
        )}
      />
    </>
  )
}

export default ProductNameInfoForm
