import { UTextarea } from "#components";
import { InputElementBaseString } from "@/entities/inputElements/inputElementBaseString";
import { InputElementWithPlaceholder } from "~/mixins/inputElementWithPlaceholder";

export class InputElementTextArea extends InputElementWithPlaceholder(InputElementBaseString)
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UTextarea, this.getProps());
    }
  }
}