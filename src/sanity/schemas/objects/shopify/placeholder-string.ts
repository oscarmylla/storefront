import { defineType } from 'sanity'
import PlaceholderStringInput from '@/sanity/components/inputs/placeholder-string'

export const placeholderString = defineType({
  name: 'placeholderString',
  title: 'Title',
  type: 'string',
  components: {
    input: PlaceholderStringInput,
  },
}
)