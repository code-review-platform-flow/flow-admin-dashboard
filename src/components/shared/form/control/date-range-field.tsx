import { DatePicker, Radio, RadioChangeEvent } from "antd";
import dayjs from "dayjs";
import React from "react";

interface IDateRangeFieldProps {
  value?: {
    startDate?: dayjs.Dayjs | null;
    endDate?: dayjs.Dayjs | null;
  };
  onChange?: (value: { startDate?: dayjs.Dayjs | null; endDate?: dayjs.Dayjs | null }) => void;
}

const dateRangeOptions = [
  { label: "오늘", value: "today" },
  { label: "1주일", value: "1week" },
  { label: "1개월", value: "1month" },
  { label: "3개월", value: "3months" },
  { label: "6개월", value: "6months" },
  { label: "1년", value: "1year" },
];

const DateRangeField = ({ value = {}, onChange }: IDateRangeFieldProps) => {
  const { startDate, endDate } = value;

  const handleDateRangeChange = (e: RadioChangeEvent) => {
    const today = dayjs();
    let newStartDate: dayjs.Dayjs | null = null;

    if (e.target.value === "today") {
      newStartDate = today;
    } else if (e.target.value === "1week") {
      newStartDate = today.subtract(1, "week");
    } else if (e.target.value === "1month") {
      newStartDate = today.subtract(1, "month");
    } else if (e.target.value === "3months") {
      newStartDate = today.subtract(3, "months");
    } else if (e.target.value === "6months") {
      newStartDate = today.subtract(6, "months");
    } else if (e.target.value === "1year") {
      newStartDate = today.subtract(1, "year");
    }

    onChange?.({
      startDate: newStartDate,
      endDate: today,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DatePicker
        placeholder="시작 날짜"
        onChange={(v: dayjs.Dayjs | null) => {
          onChange?.({ startDate: v, endDate });
        }}
        value={startDate || null}
      />
      <span>~</span>
      <DatePicker
        placeholder="종료 날짜"
        onChange={(v: dayjs.Dayjs | null) => {
          onChange?.({ startDate, endDate: v });
        }}
        value={endDate || null}
      />
      <div className="flex items-center gap-1">
        <Radio.Group
          size="small"
          options={dateRangeOptions}
          optionType="button"
          buttonStyle="solid"
          onChange={handleDateRangeChange}
        />
      </div>
    </div>
  );
};

export default React.memo(DateRangeField);
