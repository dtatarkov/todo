import * as path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      '#shared': path.resolve(__dirname, 'shared'),
      '#components': path.resolve(__dirname, 'app/components'),
      '#composables': path.resolve(__dirname, 'app/composables'),
      '#storybook':path.resolve(__dirname, '.storybook'),
    },
  },
})
