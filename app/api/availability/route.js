import { getDatabase } from "@/lib/mongodb";

const TIMES = [
  "09:00", "09:45", "10:30", "11:15", "12:00",
  "12:45", "13:30", "14:15", "15:00", "15:45",
];

function isValidDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) return false;
  const parsed = new Date(`${date}T12:00:00.000Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === date
  );
}

function getAthensDateTime() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Athens",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return {
    date: `${values.year}-${values.month}-${values.day}`,
    time: `${values.hour}:${values.minute}`,
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!isValidDate(date)) {
      return Response.json(
        { success: false, message: "Μη έγκυρη ημερομηνία." },
        { status: 400 }
      );
    }

    const day = new Date(`${date}T12:00:00.000Z`).getUTCDay();
    if (day === 0 || day === 6) {
      return Response.json({ success: true, availableSlots: [] });
    }

    const db = await getDatabase();
    const slotKeys = TIMES.map((time) => `${date}_${time}`);

    const booked = await db
      .collection("appointments")
      .find(
        { slotKey: { $in: slotKeys } },
        { projection: { _id: 0, time: 1 } }
      )
      .toArray();

    const bookedTimes = new Set(booked.map((item) => item.time));
    const now = getAthensDateTime();

    const availableSlots = TIMES.filter((time) => {
      const notBooked = !bookedTimes.has(time);
      const isFuture =
        date > now.date || (date === now.date && time > now.time);
      return notBooked && isFuture;
    });

    return Response.json({ success: true, availableSlots });
  } catch (error) {
    console.error("Availability error:", error);
    return Response.json(
      { success: false, message: "Αδυναμία φόρτωσης διαθεσιμότητας." },
      { status: 500 }
    );
  }
}