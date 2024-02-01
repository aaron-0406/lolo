import Container from '@/ui/Container'
import TagsActions from './TagsActions'
import TagsTable from './TagsTable'

const ExtrajudicialTags = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column">
      <TagsActions />
      <TagsTable />
    </Container>
  )
}

export default ExtrajudicialTags
