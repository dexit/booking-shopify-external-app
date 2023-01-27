import { DatesSetArg, EventClickArg, EventContentArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { Schedule } from "@jamalsoueidan/bsb.mongodb.types";
import { Calendar, useDate, useTag } from "@jamalsoueidan/bsf.bsf-pkg";
import { format } from "date-fns";
import { useCallback, useMemo, useState } from "react";

interface StaffCalendarProps {
  create: (info: DateClickArg) => void;
  edit: (event: EventClickArg) => void;
  onChangeDate?: (props: CalendarDateChangeProps) => void;
  data: Schedule[];
}

export default ({ create, edit, data, onChangeDate }: StaffCalendarProps) => {
  const { toTimeZone } = useDate();
  const { select: selectTag } = useTag();

  const [date, setDate] = useState<CalendarDateChangeProps>();

  const dateChanged = useCallback(
    ({ start, end }: DatesSetArg) => {
      const newDate = {
        start: start.toISOString().slice(0, 10),
        end: end.toISOString().slice(0, 10),
      };

      if (newDate.start !== date?.start || newDate.end !== date?.end) {
        setDate(newDate);
        onChangeDate(newDate);
      }
    },
    [date, onChangeDate],
  );

  const events = useMemo(
    () =>
      data?.map((extendedProps) => ({
        extendedProps,
        start: toTimeZone(extendedProps.start),
        end: toTimeZone(extendedProps.end),
        backgroundColor: extendedProps.tag,
        color: extendedProps.tag,
      })) || [],
    [data, toTimeZone],
  );

  const eventContent = useCallback(
    (arg: EventContentArg) => {
      const schedule: Schedule = arg.event.extendedProps as Schedule;
      const hour = (
        <i>
          {format(arg.event.start, "HH:mm")} - {format(arg.event.end, "HH:mm")}
        </i>
      );

      return (
        <div
          style={{
            cursor: "pointer",
            padding: "5px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>{hour}</div>
          <div>{selectTag(schedule.tag as never)} </div>
          {schedule.groupId && (
            <div
              style={{
                marginTop: "4px",
                width: "15px",
                height: "15px",
                backgroundColor: "#" + schedule.groupId.slice(-6),
              }}
            ></div>
          )}
        </div>
      );
    },
    [selectTag],
  );

  const validRange = useCallback((start: Date) => {
    return { start };
  }, []);

  return (
    <Calendar
      events={events}
      eventContent={eventContent}
      datesSet={dateChanged}
      headerToolbar={{
        left: "today prev,next",
        center: "title",
        right: null,
      }}
      dateClick={create}
      eventClick={edit}
      validRange={validRange}
    />
  );
};
