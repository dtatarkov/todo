import { addComponentsDir, addImports, addImportsDir, defineNuxtModule } from "@nuxt/kit";
import { createResolver } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: 'todo',
  },

  setup()
  {
    const resolver = createResolver(import.meta.url);

    addComponentsDir({
      path: resolver.resolve('./runtime/app/widgets')
    });

    addImportsDir(resolver.resolve('./runtime/app/composables'));

    addImports([
      { from: resolver.resolve('./runtime/app/interfaces/todosService'), name: 'ToDosService' },
      { from: resolver.resolve('./runtime/app/interfaces/todo'), name: 'ToDo' },
    ])
  },
})