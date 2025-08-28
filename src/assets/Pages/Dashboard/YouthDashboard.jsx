import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/** ---------- Mood Tracker constants ---------- */
const MOODS = [
  { value: 1, label: "Awful", emoji: "😞", badge: "bg-red-50 text-red-700 ring-1 ring-red-200" },
  { value: 2, label: "Low", emoji: "🙁", badge: "bg-orange-50 text-orange-700 ring-1 ring-orange-200" },
  { value: 3, label: "Okay", emoji: "😐", badge: "bg-gray-50 text-gray-700 ring-1 ring-gray-200" },
  { value: 4, label: "Good", emoji: "🙂", badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" },
  { value: 5, label: "Great", emoji: "😄", badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-200" },
];

const PRESET_TAGS = [
  "Anxious", "Stressed", "Calm", "Happy", "Sad",
  "Tired", "Hopeful", "Grateful", "Overwhelmed", "Motivated",
];

const LS_KEY = "mr_mood_entries_v1";

/** ---------- Storage helpers ---------- */
function loadEntries() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveEntries(entries) {
  localStorage.setItem(LS_KEY, JSON.stringify(entries));
}

/** ---------- Page ---------- */
export default function YouthDashboard() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Youth Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome! Track your mood, find resources, and book sessions tailored for ages 13–25.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/booking" className="px-3 py-2 rounded-md text-sm therapeutic-gradient text-white">
            Book Session
          </Link>
          <Link to="/therapists" className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted">
            Browse Therapists
          </Link>
          <Link to="/resources" className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted">
            Resources
          </Link>
          <Link to="/chat" className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted">
            Support Chat
          </Link>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mood Tracker (2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-border/60 bg-background p-4">
          <MoodTracker />
        </div>

        {/* Helpful panel */}
        <aside className="rounded-xl border border-border/60 bg-background p-4">
          <h3 className="font-medium">Tips & Resources</h3>
          <ul className="mt-3 text-sm list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Try to check in daily around the same time to build a habit.</li>
            <li>Use tags to note triggers or wins (e.g., “exams”, “exercise”).</li>
            <li>Share your chart or export CSV if working with a therapist.</li>
          </ul>
            <div className="mt-4 rounded-lg border border-dashed border-border p-3">
            <p className="text-sm">Want reminders or cloud sync?</p>
            <p className="text-xs text-muted-foreground">
              We’ll hook this up later so your entries sync across devices.
            </p>
          
          </div>
        </aside>
      </section>
    </div>
  );
}

/** ---------- Mood Tracker component ---------- */
function MoodTracker() {
  const [entries, setEntries] = useState(() => loadEntries());
  const [mood, setMood] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [notes, setNotes] = useState("");

  // build a 14-day series ending today
  const series = useMemo(() => {
    const byDate = {};
    entries.forEach((e) => (byDate[e.date] = e)); // last entry of day wins

    const days = [];
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({
        date: key,
        mood: byDate[key]?.mood ?? null,
      });
    }
    return days;
  }, [entries]);

  const todayKey = new Date().toISOString().slice(0, 10);
  const todayEntry = entries.find((e) => e.date === todayKey);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  function toggleTag(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function saveToday() {
    if (!mood) {
      alert("Pick a mood to save your check-in.");
      return;
    }
    const next = entries.filter((e) => e.date !== todayKey);
    next.push({
      id: crypto.randomUUID(),
      date: todayKey,
      mood,
      tags: selectedTags,
      notes: notes.trim(),
      createdAt: Date.now(),
    });
    next.sort((a, b) => (a.date < b.date ? -1 : 1));
    setEntries(next);
    setSelectedTags([]);
    setNotes("");
  }

  function clearAll() {
    if (!confirm("Delete all mood entries on this device?")) return;
    setEntries([]);
  }

  function exportCSV() {
    const headers = ["date", "mood", "tags", "notes"];
    const rows = entries.map((e) => [
      e.date,
      e.mood,
      (e.tags || []).join("|"),
      (e.notes || "").replace(/\n/g, " "),
    ]);
    const csv =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mood-entries.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold">Mood Tracker</h2>
          <p className="text-sm text-muted-foreground">
            Check in daily. Your last 14 days appear in the chart.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted">
            Export CSV
          </button>
          <button onClick={clearAll} className="px-3 py-2 rounded-md text-sm border border-destructive text-destructive/90 hover:bg-destructive/10">
            Clear data
          </button>
        </div>
      </div>

      {/* Quick pick moods */}
      <div className="mt-4 flex flex-wrap gap-2">
        {MOODS.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => setMood(m.value)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${m.badge} ${
              mood === m.value ? "ring-2 ring-offset-1 ring-offset-background" : ""
            }`}
            title={m.label}
          >
            <span className="text-base">{m.emoji}</span>
            <span className="font-medium">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-4">
        <p className="text-sm font-medium">What describes today?</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESET_TAGS.map((t) => {
            const active = selectedTags.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                className={`rounded-full px-3 py-1 text-xs border ${
                  active ? "therapeutic-gradient text-white" : "border-border hover:bg-muted"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4">
        <label className="text-sm font-medium">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Anything you want to remember about today?"
          className="mt-2 w-full rounded-md border border-border bg-background p-2 outline-none"
        />
      </div>

      {/* Save */}
      <div className="mt-4">
        <button onClick={saveToday} className="px-4 py-2 rounded-md therapeutic-gradient text-white">
          Save today’s check-in
        </button>
        {todayEntry && (
          <p className="text-xs text-muted-foreground mt-2">
            Saved for today: <strong>{labelFor(todayEntry.mood)}</strong>
            {todayEntry.tags?.length ? ` • ${todayEntry.tags.join(", ")}` : ""}
          </p>
        )}
      </div>

      {/* Chart */}
      <MoodChart data={series} />
      {/* Recent entries */}
      <HistoryList entries={entries} />
    </div>
  );
}

/** ---------- Small subcomponents ---------- */
function labelFor(v) {
  return MOODS.find((m) => m.value === v)?.label ?? "";
}

function MoodChart({ data }) {
  const width = 700; // viewBox width (scales responsively)
  const height = 120;
  const padding = 16;

  const points = data.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / (data.length - 1 || 1);
    const y =
      d.mood == null
        ? null
        : padding + ((5 - d.mood) * (height - padding * 2)) / 4; // 5 at top, 1 at bottom
    return { x, y, date: d.date, mood: d.mood };
  });

  const pathD = points
    .map((p, i) => (p.y == null ? "" : `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`))
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Last 14 days</h4>
        <div className="text-xs text-muted-foreground">Higher is better</div>
      </div>

      <div className="mt-2 rounded-lg border border-border/60 bg-background p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-28 text-foreground/70">
          {/* grid */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padding + (i * (height - padding * 2)) / 4;
            return <line key={i} x1={padding} x2={width - padding} y1={y} y2={y} className="stroke-border" strokeWidth="1" />;
          })}
          {/* line */}
          {pathD && <path d={pathD} fill="none" stroke="currentColor" strokeWidth="2" />}
          {/* points */}
          {points.map(
            (p, i) =>
              p.y != null && (
                <circle key={i} cx={p.x} cy={p.y} r="3" className="fill-current" />
              )
          )}
        </svg>
        {/* x labels (every 3rd day) */}
        <div className="mt-1 grid grid-cols-14 text-[10px] text-muted-foreground">
          {data.map((d, i) => (
            <div key={d.date} className="text-center">
              {i % 3 === 0 ? d.date.slice(5).replace("-", "/") : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryList({ entries }) {
  if (!entries.length) return null;
  const recent = [...entries].reverse().slice(0, 10);
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium">Recent entries</h4>
      <ul className="mt-2 space-y-2">
        {recent.map((e) => (
          <li key={e.id} className="rounded-lg border border-border/60 bg-background p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                {e.date} — {labelFor(e.mood)}
              </div>
              {e.tags?.length ? (
                <div className="flex flex-wrap gap-1">
                  {e.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-border">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            {e.notes ? (
              <p className="text-xs text-muted-foreground mt-1">{e.notes}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
