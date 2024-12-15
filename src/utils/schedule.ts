import { parse, addMinutes, format } from 'date-fns';

interface TimeSlot {
  start: string;
  end: string;
}

export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  duration: number
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  let currentTime = parse(startTime, 'HH:mm', new Date());
  const endTimeDate = parse(endTime, 'HH:mm', new Date());

  while (currentTime < endTimeDate) {
    const slotStart = format(currentTime, 'HH:mm');
    const slotEnd = format(addMinutes(currentTime, duration), 'HH:mm');

    slots.push({
      start: slotStart,
      end: slotEnd
    });

    currentTime = addMinutes(currentTime, duration);
  }

  return slots;
};