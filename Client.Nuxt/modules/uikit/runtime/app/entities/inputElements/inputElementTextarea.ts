import { UTextarea } from "#components";
import { InputElementWithPlaceholder } from "#uikit/mixins/inputElementWithPlaceholder";
import { InputElementBaseString } from "#uikit/entities/inputElements/inputElementBaseString";

export class InputElementTextArea extends InputElementWithPlaceholder(InputElementBaseString)
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UTextarea, this.data);
    }
  }
}