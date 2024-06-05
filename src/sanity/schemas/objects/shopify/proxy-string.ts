import { defineField } from 'sanity'

import ProxyStringInput from '@/sanity/components/inputs/proxy-string'

export const proxyString = defineField({
  name: 'proxyString',
  title: 'Title',
  type: 'string',
  components: {
    input: ProxyStringInput,
  },
})
