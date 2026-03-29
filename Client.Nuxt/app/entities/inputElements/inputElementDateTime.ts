import { InputElementDate } from "./inputElementDate";
import { InputElementTime } from "~/entities/inputElements/inputElementTime";
import { InputElement } from "~/interfaces/inputElement";
import { type DatesService } from "~/interfaces/datesService";
import { UIElementId } from "~/entities/uiElementId";
import type { StringsService } from "~/interfaces/stringsService";
import type { ZonedDateTimeMapper } from "~/interfaces/zonedDateTimeMapper";
import type { TimeMapper } from "~/interfaces/timeMapper";

export class InputElementDateTime extends InputElement<Date | undefined>
{
  private _uiElementId = new UIElementId();
  private _defaultId   = `input-date-time-${ this._uiElementId.value }`;
  private _id          = ref('');

  readonly component = {
    setup: () =>
    {
      const props = {
        class: 'flex gap-1'
      }

      return () => h('div', props, [
        h(this.inputDate.component),
        h(this.inputTime.component)
      ])
    }
  }

  inputDate: InputElementDate;
  inputTime: InputElementTime;

  constructor(
    private datesService: DatesService,
    private stringsService: StringsService,
    zonedDateTimeMapper: ZonedDateTimeMapper,
    timeMapper: TimeMapper
  )
  {
    super();

    this.inputDate = new InputElementDate(zonedDateTimeMapper);
    this.inputTime = new InputElementTime(timeMapper);

    this.id = this._defaultId;
  }

  get id()
  {
    return this._id.value;
  }

  set id(value)
  {
    let newId = this.stringsService.isStringEmpty(value) ? this._defaultId : value;

    this._id.value = newId;

    this.inputDate.setData({
      id: `${ newId }-input-date`
    });

    this.inputTime.setData(({
      id: `${ newId }-input-time`
    }));
  }

  get value(): Date | undefined
  {
    const date               = this.inputDate.value;
    const timeInMilliseconds = this.inputTime.value;

    if (!date || !timeInMilliseconds)
    {
      return undefined;
    }

    const result = this.datesService.setTime(date, timeInMilliseconds);

    return result;
  }

  set value(value: Date | undefined)
  {
    if (!value)
    {
      this.inputDate.value = undefined;
      this.inputTime.value = undefined;
      return;
    }

    const time = this.datesService.getTime(value);
    const date = this.datesService.setTime(value, 0);

    this.inputDate.value = date;
    this.inputTime.value = time;
  }

  setData(data: Record<string, any>)
  {
    let inputsData = { ...data }

    if (inputsData?.id)
    {
      this.id = inputsData.id;
      delete inputsData.id;
    }

    if (inputsData?.value)
    {
      if (inputsData?.value)
      {
        this.value = inputsData.value;
        delete inputsData.value;
      }
    }

    this.inputDate.setData(inputsData);
    this.inputTime.setData(inputsData);
  }
}