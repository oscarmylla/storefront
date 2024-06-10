import { ConfigContext } from 'sanity'
import { StructureBuilder } from 'sanity/structure'

/**
 * Helper for creating and typing composable structure parts.
 */
export function defineStructure<StructureType>(
  factory: (S: StructureBuilder, context: ConfigContext) => StructureType
) {
  return factory
}
