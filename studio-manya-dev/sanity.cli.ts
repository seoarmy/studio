import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '7f88m3q2',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: false,
    appId: 'ixrsxtrp0yoc7v6u10c4a1in',
  }
})
