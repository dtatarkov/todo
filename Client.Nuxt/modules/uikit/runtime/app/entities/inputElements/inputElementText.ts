import { UInput } from "#components";
import { InputElementWithPlaceholder } from "../../mixins/inputElementWithPlaceholder";
import { InputElementBaseString } from "./inputElementBaseString";

export class InputElementText extends InputElementWithPlaceholder(InputElementBaseString)
{
  readonly component = {
    setup: () =>
    {
      return () => h(<any>UInput, this.data);
    }
  }
}