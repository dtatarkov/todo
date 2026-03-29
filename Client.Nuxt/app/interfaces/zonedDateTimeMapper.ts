import { ValueMapper } from "~/interfaces/valueMapper";
import type { ZonedDateTime } from "@internationalized/date";

export abstract class ZonedDateTimeMapper extends ValueMapper<Date, ZonedDateTime>
{
}