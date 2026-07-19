import { useState, useEffect } from 'react';

function fmt(date: Date, tz: string) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(date);
}

export function useWorldClocks() {
  const [times, setTimes] = useState({ toronto: '00:00:00', london: '00:00:00', tokyo: '00:00:00' });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimes({
        toronto: fmt(now, 'America/Toronto'),
        london: fmt(now, 'Europe/London'),
        tokyo: fmt(now, 'Asia/Tokyo'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return times;
}
