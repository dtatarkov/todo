import { UInput } from "#components";
import { InputElementBaseString } from "@/entities/inputElements/inputElementBaseString";
import { InputElementWithPlaceholder } from "~/mixins/inputElementWithPlaceholder";

export class InputElementText extends InputElementWithPlaceholder(InputElementBaseString)
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UInput, this.getProps());
    }
  }
}