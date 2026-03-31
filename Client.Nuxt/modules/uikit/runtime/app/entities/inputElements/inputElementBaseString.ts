import type { StringsService } from "~/interfaces/stringsService";
import { InputElementBase } from "#uikit/entities/inputElements/inputElementBase";

export abstract class InputElementBaseString extends InputElementBase<string>
{
  constructor(
    stringsService: StringsService,
  )
  {
    super(stringsService);

    Object.assign(this.data, { modelValue: '' });
  }
}