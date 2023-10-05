import { Box } from '@mui/material';
import type { DateRange } from '@mui/x-date-pickers-pro';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';

interface CustomDatePickersProps {
  onDateSelect: (dateRange: DateRange<Dayjs>) => void;
  onSelectedDate: DateRange<Dayjs>;
}

export default function CustomDatePickers(props: CustomDatePickersProps) {
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>(props.onSelectedDate);

  const handleDateChange = (newDateRange: DateRange<Dayjs>) => {
    setDateRange(newDateRange);
    props.onDateSelect(newDateRange);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ width: '400px' }}>
          <SingleInputDateTimeRangeField
            label="Controlled field"
            value={dateRange}
            onChange={handleDateChange}
            fullWidth
          />
        </Box>
      </LocalizationProvider>

    </>
  );
}
