"use client";

import { useState, useEffect } from "react";
import { getWIBHour, formatWIBTime } from "../utils";

export interface WIBTime {
  hour: number;
  formatted: string;
  date: Date;
}

export function useWIBTime(): WIBTime {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return {
    hour: getWIBHour(now),
    formatted: formatWIBTime(now),
    date: now,
  };
}
