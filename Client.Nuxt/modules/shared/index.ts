import { addImports, addImportsDir, defineNuxtModule } from "@nuxt/kit";
import { createResolver } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: 'shared',
  },

  setup()
  {
    const resolver = createResolver(import.meta.url);

    addImportsDir(resolver.resolve('./runtime/app/enums'));
    addImportsDir(resolver.resolve('./runtime/app/types'));
    addImportsDir(resolver.resolve('./runtime/app/composables'));
    addImportsDir(resolver.resolve('./runtime/app/utils'));

    addImports([
      { from: resolver.resolve('./runtime/app/interfaces/appRuntimeConfig'), name: 'AppPublicRuntimeConfig' },
      { from: resolver.resolve('./runtime/app/interfaces/datesService'), name: 'DatesService' },
      { from: resolver.resolve('./runtime/app/interfaces/stringsService'), name: 'StringsService' },
    ])
  },
})