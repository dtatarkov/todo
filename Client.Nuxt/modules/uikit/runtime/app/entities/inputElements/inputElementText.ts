import { UInput } from "#components";
import { InputElementWithPlaceholder } from "#uikit/mixins/inputElementWithPlaceholder";
import { InputElementBaseString } from "#uikit/entities/inputElements/inputElementBaseString";

export class InputElementText extends InputElementWithPlaceholder(InputElementBaseString)
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UInput, this.data);
    }
  }
}