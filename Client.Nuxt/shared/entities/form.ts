import { UForm } from "#components";
import { ViewElementBase } from "#shared/entities/viewElementBase";

export class Form extends ViewElementBase {
  override getRenderFunction(): () => object
  {
    return () => h(UForm)
  }
}