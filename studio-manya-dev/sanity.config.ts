import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { table } from '@sanity/table'
import { structure } from './structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'MANYA dev',

  projectId: '7f88m3q2',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool(), table()],

  schema: {
    types: schemaTypes,
  },
})
