import { createResolver } from "nuxt/kit"
import { addImports, addImportsDir, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: 'uikit',
  },

  setup()
  {
    const resolver = createResolver(import.meta.url);

    addImportsDir(resolver.resolve('./runtime/app/entities/inputElements'));

    addImports([
      { from: resolver.resolve('./runtime/app/interfaces/inputElement'), name: 'InputElement' },
      { from: resolver.resolve('./runtime/app/interfaces/uiElement'), name: 'UIElement' },
    ])
  },
})