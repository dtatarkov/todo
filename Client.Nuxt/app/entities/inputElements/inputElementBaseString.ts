import { InputElementBase } from "@/entities/inputElements/inputElementBase";
import type { StringsService } from "~/interfaces/stringsService";

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