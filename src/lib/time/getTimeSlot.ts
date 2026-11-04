import { TimeSlot } from "@/types/timeslot";

export function getTimeSlot(hour: number): TimeSlot {
  if (hour >= 6 && hour < 12) {
    return "morning";
  } else if (hour >= 12 && hour < 18) {
    return "afternoon";
  } else if (hour >= 18 && hour < 21) {
    return "evening";
  } else {
    return "night";
  }
}
