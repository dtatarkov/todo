import type { Preview } from '@storybook-vue/nuxt';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  
  beforeAll: () => {
    useServiceLocator();
    useApplicationServices();
    useApplicationViewModels();
  },
  
  tags: ['autodocs'],
};

export default preview;