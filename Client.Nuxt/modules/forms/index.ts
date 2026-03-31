import { addComponentsDir, addImports, addImportsDir, defineNuxtModule } from "@nuxt/kit";
import { createResolver } from "nuxt/kit";
import { FormFactory } from "@@/modules/forms/runtime/app/interfaces/formFactory";

export default defineNuxtModule({
  meta: {
    name: 'forms',
  },

  setup()
  {
    const resolver = createResolver(import.meta.url);

    addComponentsDir({
      path: resolver.resolve('./runtime/app/components')
    });

    addImportsDir(resolver.resolve('./runtime/app/enums'));
    addImportsDir(resolver.resolve('./runtime/app/composables'));

    addImports([
      { from: resolver.resolve('./runtime/app/types/formElementCreateData'), name: 'FormElementCreateData' },
    ]);

    addImports([
      { from: resolver.resolve('./runtime/app/interfaces/form'), name: 'Form' },
      { from: resolver.resolve('./runtime/app/interfaces/formFactory'), name: 'FormFactory' },
    ]);
  },
})