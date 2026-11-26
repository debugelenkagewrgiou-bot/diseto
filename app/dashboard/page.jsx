"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import {
  RefreshCw,
  CalendarDays,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Paperclip,
  MessageSquare,
  Loader2,
  MailCheck,
  MailX,
  Inbox,
  History,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

/* =========================================
   HELPERS
========================================= */

const statusLabels = {
  pending: "Σε αναμονή",
  approved: "Εγκρίθηκε",
  rejected: "Απορρίφθηκε",
};

function formatDate(date) {
  if (!date) return "—";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function formatCreatedAt(date) {
  if (!date) return "—";
  try {
    return new Intl.DateTimeFormat("el-GR", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Athens",
    }).format(new Date(date));
  } catch {
    return "—";
  }
}

/* =========================================
   COMPONENTS
========================================= */

function StatusPill({ status }) {
  const styles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "approved"
            ? "bg-emerald-500"
            : status === "rejected"
            ? "bg-rose-500"
            : "bg-amber-500"
        }`}
      />
      {statusLabels[status] || status || "Σε αναμονή"}
    </span>
  );
}

function EmailStatus({ emailSent, emailError }) {
  if (emailSent) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
        <MailCheck size={14} /> Email στάλθηκε
      </span>
    );
  }
  if (emailError) {
    return (
      <span
        className="inline-flex items-center gap-1 text-xs font-medium text-rose-600"
        title={emailError}
      >
        <MailX size={14} /> Email απέτυχε
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
      <Mail size={14} /> Δεν στάλθηκε
    </span>
  );
}

function StatCard({ icon: Icon, label, value, accent = "gray" }) {
  const accents = {
    gray: "bg-gray-50 text-gray-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className={`rounded-lg p-2 ${accents[accent]}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="mt-3 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function AppointmentCard({ item, onUpdate, updating }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {item.name}
            </h3>
            <StatusPill status={item.status || "pending"} />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Αίτημα: {item.createdAtDisplay}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CalendarDays size={16} className="text-gray-400" />
          <span className="font-medium">{formatDate(item.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock size={16} className="text-gray-400" />
          <span className="font-medium">{item.time}</span>
        </div>
        <a
          href={`mailto:${item.email}`}
          className="flex items-center gap-2 text-sm text-gray-700 transition hover:text-blue-600"
        >
          <Mail size={16} className="text-gray-400" />
          <span className="truncate">{item.email}</span>
        </a>
        <a
          href={`tel:${item.phone}`}
          className="flex items-center gap-2 text-sm text-gray-700 transition hover:text-blue-600"
        >
          <Phone size={16} className="text-gray-400" />
          <span>{item.phone}</span>
        </a>
      </div>

      {item.project && (
        <div className="mt-4 rounded-lg bg-gray-50 px-3 py-2 text-sm">
          <span className="text-gray-500">Project: </span>
          <span className="font-medium text-gray-800">{item.project}</span>
        </div>
      )}

      {item.message && (
        <>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? "Απόκρυψη μηνύματος" : "Προβολή μηνύματος"}
          </button>
          {expanded && (
            <p className="mt-2 whitespace-pre-wrap rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm leading-6 text-gray-700">
              {item.message}
            </p>
          )}
        </>
      )}

      <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row">
        <button
          type="button"
          disabled={updating}
          onClick={() => onUpdate(item._id, "approved")}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updating ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <CheckCircle2 size={18} />
          )}
          Έγκριση & Αποστολή Email
        </button>

        <button
          type="button"
          disabled={updating}
          onClick={() => onUpdate(item._id, "rejected")}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-rose-200 bg-white px-5 py-3.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updating ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <XCircle size={18} />
          )}
          Απόρριψη
        </button>
      </div>
    </div>
  );
}

function ContactCard({
  item,
  onDownload,
  onToggleRead,
  onDelete,
  onReply,
}) {
  const isUnread = !item.read;

  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
        isUnread
          ? "border-blue-200 ring-1 ring-blue-100"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {isUnread && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            )}
            <h3
              className={`truncate text-lg ${
                isUnread
                  ? "font-semibold text-gray-900"
                  : "font-medium text-gray-700"
              }`}
            >
              {item.name}
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {item.createdAtDisplay}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            isUnread
              ? "bg-blue-50 text-blue-700"
              : "bg-gray-50 text-gray-500"
          }`}
        >
          {isUnread ? "Νέο" : "Διαβασμένο"}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <a
          href={`mailto:${item.email}`}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
        >
          <Mail size={16} className="text-gray-400" />
          <span className="truncate">{item.email}</span>
        </a>
        <a
          href={`tel:${item.phone}`}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
        >
          <Phone size={16} className="text-gray-400" />
          {item.phone}
        </a>
        {item.area && (
          <p className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin size={16} className="text-gray-400" />
            {item.area}
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-gray-50 p-3 text-sm">
        {item.clientType && (
          <div>
            <p className="text-xs text-gray-500">Τύπος πελάτη</p>
            <p className="font-medium text-gray-800">{item.clientType}</p>
          </div>
        )}
        {item.project && (
          <div>
            <p className="text-xs text-gray-500">Project</p>
            <p className="font-medium text-gray-800">{item.project}</p>
          </div>
        )}
        {item.budget && (
          <div>
            <p className="text-xs text-gray-500">Budget</p>
            <p className="font-medium text-gray-800">{item.budget}</p>
          </div>
        )}
      </div>

      {item.message && (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Μήνυμα
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700">
            {item.message}
          </p>
        </div>
      )}

      {item.files?.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="mb-2 flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-500">
            <Paperclip size={13} /> Συνημμένα ({item.files.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {item.files.map((file, index) => (
              <button
                key={`${file.name}-${index}`}
                onClick={() => onDownload(item._id, file, index)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                {file.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
        <button
          onClick={() => onReply(item)}
          className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
        >
          <Mail size={14} />
          Απάντηση
        </button>

        <button
          onClick={() => onToggleRead(item)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
            isUnread
              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {isUnread ? (
            <>
              <MailCheck size={14} /> Σήμανση ως διαβασμένο
            </>
          ) : (
            <>
              <Mail size={14} /> Σήμανση ως μη διαβασμένο
            </>
          )}
        </button>

        <button
          onClick={() => onDelete(item)}
          className="ml-auto flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
        >
          <XCircle size={14} />
          Διαγραφή
        </button>
      </div>
    </div>
  );
}

/* =========================================
   MAIN PAGE
========================================= */

export default function DashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("appointments");
  const [contactFilter, setContactFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState(null);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const abortRef = useRef(null);

  /* LOAD DATA */
  const loadData = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError("");

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const [appointmentsResponse, contactsResponse] = await Promise.all([
        fetch("/api/appointments", {
          cache: "no-store",
          signal: controller.signal,
        }),
        fetch("/api/contacts", {
          cache: "no-store",
          signal: controller.signal,
        }),
      ]);

      const appointmentsData = await appointmentsResponse.json();
      const contactsData = await contactsResponse.json();

      if (!appointmentsResponse.ok || !appointmentsData.success) {
        throw new Error(
          appointmentsData.message || "Αδυναμία φόρτωσης ραντεβού."
        );
      }
      if (!contactsResponse.ok || !contactsData.success) {
        throw new Error(
          contactsData.message || "Αδυναμία φόρτωσης μηνυμάτων."
        );
      }

      setAppointments(appointmentsData.appointments || []);
      setContacts(contactsData.contacts || []);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message || "Παρουσιάστηκε σφάλμα.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [loadData]);

  const refreshData = () => {
    setRefreshing(true);
    loadData(false);
  };

  /* APPOINTMENT ACTIONS */
  const updateAppointment = async (id, status) => {
    const confirmed = window.confirm(
      status === "approved"
        ? "Έγκριση ραντεβού;\n\nΘα σταλεί email επιβεβαίωσης στον πελάτη."
        : "Απόρριψη ραντεβού;\n\nΘα σταλεί email ενημέρωσης στον πελάτη."
    );
    if (!confirmed) return;

    setUpdating(id);
    setError("");
    setNotice("");

    const previous = appointments;
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status } : a))
    );

    try {
      const response = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Η ενημέρωση απέτυχε.");
      }

      setNotice(
        data.emailSent
          ? `✅ ${data.message} Το email στάλθηκε στον πελάτη.`
          : `⚠️ ${data.message} Το email ΔΕΝ στάλθηκε${
              data.emailError ? `: ${data.emailError}` : "."
            }`
      );

      await loadData(false);
    } catch (err) {
      setAppointments(previous);
      setError(err.message || "Παρουσιάστηκε σφάλμα.");
    } finally {
      setUpdating(null);
    }
  };

  /* CONTACT ACTIONS */
  const toggleContactRead = async (contact) => {
    const newRead = !contact.read;

    setContacts((prev) =>
      prev.map((c) =>
        c._id === contact._id ? { ...c, read: newRead } : c
      )
    );

    try {
      const response = await fetch(`/api/contacts/${contact._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: newRead }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Η ενημέρωση απέτυχε.");
      }
    } catch (err) {
      setContacts((prev) =>
        prev.map((c) =>
          c._id === contact._id ? { ...c, read: contact.read } : c
        )
      );
      setError(err.message || "Παρουσιάστηκε σφάλμα.");
    }
  };

  const deleteContact = async (contact) => {
    const confirmed = window.confirm(
      `Διαγραφή μηνύματος από "${contact.name}";\n\nΗ ενέργεια δεν αναιρείται.`
    );
    if (!confirmed) return;

    const previous = contacts;
    setContacts((prev) => prev.filter((c) => c._id !== contact._id));

    try {
      const response = await fetch(`/api/contacts/${contact._id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Η διαγραφή απέτυχε.");
      }

      setNotice("✅ Το μήνυμα διαγράφηκε.");
    } catch (err) {
      setContacts(previous);
      setError(err.message || "Παρουσιάστηκε σφάλμα.");
    }
  };

  const replyToContact = (contact) => {
    const subject = encodeURIComponent(
      `Απάντηση στο αίτημά σας - DISETO`
    );
    const body = encodeURIComponent(
      `Αγαπητέ/ή ${contact.name},\n\nΣας ευχαριστούμε για το μήνυμά σας.\n\n`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const downloadFile = (contactId, file, index) => {
    if (!contactId || !file) return;
    const url = `/api/contacts/${contactId}/files/${index}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name || "attachment";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  /* COMPUTED */
  const withDisplayDate = (items) =>
    items.map((item) => ({
      ...item,
      createdAtDisplay: mounted ? formatCreatedAt(item.createdAt) : "—",
    }));

  const pendingAppointments = withDisplayDate(
    appointments.filter(
      (item) => !item.status || item.status === "pending"
    )
  );

  const completedAppointments = withDisplayDate(
    appointments.filter(
      (item) => item.status === "approved" || item.status === "rejected"
    )
  );

  const approvedAppointments = appointments.filter(
    (item) => item.status === "approved"
  );

  const displayContacts = withDisplayDate(contacts);
  const unreadContacts = contacts.filter((c) => !c.read);

  const filteredContacts =
    contactFilter === "unread"
      ? displayContacts.filter((c) => !c.read)
      : displayContacts;

  /* =========================================
     RENDER
  ========================================= */
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 pb-20 pt-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                DISETO / Administration
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-500">
              Διαχείριση ραντεβού και μηνυμάτων πελατών.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/dashboard/photos"
              className="flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-700"
            >
              <ImageIcon size={15} />
              Φωτογραφίες
            </a>
            <button
              onClick={refreshData}
              disabled={refreshing}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={refreshing ? "animate-spin" : ""}
              />
              Ανανέωση
            </button>
            <SignOutButton redirectUrl="/sign-in">
              <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50">
                <LogOut size={15} />
                Αποσύνδεση
              </button>
            </SignOutButton>
          </div>
        </header>

        {/* NOTICES */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {notice && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-gray-500">
            <Loader2 size={18} className="animate-spin" />
            Φόρτωση δεδομένων...
          </div>
        ) : (
          <>
            {/* STATS */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={CalendarDays}
                label="Σύνολο ραντεβού"
                value={appointments.length}
                accent="blue"
              />
              <StatCard
                icon={Clock}
                label="Σε αναμονή"
                value={pendingAppointments.length}
                accent="amber"
              />
              <StatCard
                icon={CheckCircle2}
                label="Εγκεκριμένα"
                value={approvedAppointments.length}
                accent="emerald"
              />
              <StatCard
                icon={Users}
                label="Μηνύματα"
                value={contacts.length}
                accent="gray"
              />
            </div>

            {/* TABS */}
            <div className="mb-6 flex gap-1 rounded-xl bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab("appointments")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  activeTab === "appointments"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <CalendarDays size={16} />
                Ραντεβού
                {pendingAppointments.length > 0 && (
                  <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {pendingAppointments.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("contacts")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  activeTab === "contacts"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <MessageSquare size={16} />
                Μηνύματα ({contacts.length})
                {unreadContacts.length > 0 && (
                  <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {unreadContacts.length}
                  </span>
                )}
              </button>
            </div>

            {/* APPOINTMENTS TAB */}
            {activeTab === "appointments" && (
              <div className="space-y-8">
                <section>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <Inbox size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Εκκρεμή αιτήματα
                      </h2>
                      <p className="text-sm text-gray-500">
                        {pendingAppointments.length} ραντεβού περιμένουν
                        έγκριση
                      </p>
                    </div>
                  </div>

                  {pendingAppointments.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
                      <Inbox size={48} className="mx-auto text-gray-300" />
                      <h3 className="mt-4 text-lg font-semibold text-gray-700">
                        Δεν υπάρχουν εκκρεμή ραντεβού
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Όταν ένας πελάτης κλείσει ραντεβού από τη φόρμα
                        επικοινωνίας, θα εμφανιστεί εδώ.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      {pendingAppointments.map((item) => (
                        <AppointmentCard
                          key={item._id}
                          item={item}
                          onUpdate={updateAppointment}
                          updating={updating === item._id}
                        />
                      ))}
                    </div>
                  )}
                </section>

                <section>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                      <History size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Ιστορικό ραντεβού
                      </h2>
                      <p className="text-sm text-gray-500">
                        {completedAppointments.length} ολοκληρωμένα
                        ραντεβού
                      </p>
                    </div>
                  </div>

                  {completedAppointments.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
                      <History size={48} className="mx-auto text-gray-300" />
                      <h3 className="mt-4 text-lg font-semibold text-gray-700">
                        Δεν υπάρχει ιστορικό
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Τα εγκεκριμένα και απορριφθέντα ραντεβού θα
                        εμφανίζονται εδώ.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                          <tr>
                            <th className="p-4 font-medium">Πελάτης</th>
                            <th className="p-4 font-medium">Ημερομηνία</th>
                            <th className="p-4 font-medium">Ώρα</th>
                            <th className="p-4 font-medium">Κατάσταση</th>
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium">Ενέργειες</th>
                          </tr>
                        </thead>
                        <tbody>
                          {completedAppointments.map((item) => (
                            <tr
                              key={item._id}
                              className="border-t border-gray-100 hover:bg-gray-50"
                            >
                              <td className="p-4">
                                <p className="font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500">
                                  {item.email}
                                </p>
                              </td>
                              <td className="p-4 text-gray-700">
                                {formatDate(item.date)}
                              </td>
                              <td className="p-4 text-gray-700">
                                {item.time}
                              </td>
                              <td className="p-4">
                                <StatusPill status={item.status} />
                              </td>
                              <td className="p-4">
                                <EmailStatus
                                  emailSent={item.emailSent}
                                  emailError={item.emailError}
                                />
                              </td>
                              <td className="p-4">
                                <div className="flex flex-wrap gap-1.5">
                                  {item.status !== "approved" && (
                                    <button
                                      disabled={updating === item._id}
                                      onClick={() =>
                                        updateAppointment(
                                          item._id,
                                          "approved"
                                        )
                                      }
                                      className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-40"
                                    >
                                      Έγκριση
                                    </button>
                                  )}
                                  {item.status !== "rejected" && (
                                    <button
                                      disabled={updating === item._id}
                                      onClick={() =>
                                        updateAppointment(
                                          item._id,
                                          "rejected"
                                        )
                                      }
                                      className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100 disabled:opacity-40"
                                    >
                                      Απόρριψη
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </div>
            )}

            {/* CONTACTS TAB */}
            {activeTab === "contacts" && (
              <section>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Μηνύματα επικοινωνίας
                      </h2>
                      <p className="text-sm text-gray-500">
                        {contacts.length} μηνύματα · {unreadContacts.length}{" "}
                        νέα
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
                    <button
                      onClick={() => setContactFilter("all")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        contactFilter === "all"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Όλα ({contacts.length})
                    </button>
                    <button
                      onClick={() => setContactFilter("unread")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        contactFilter === "unread"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Νέα ({unreadContacts.length})
                    </button>
                  </div>
                </div>

                {filteredContacts.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
                    <MessageSquare
                      size={48}
                      className="mx-auto text-gray-300"
                    />
                    <h3 className="mt-4 text-lg font-semibold text-gray-700">
                      {contactFilter === "unread"
                        ? "Δεν υπάρχουν νέα μηνύματα"
                        : "Δεν υπάρχουν μηνύματα"}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {contactFilter === "unread"
                        ? "Όλα τα μηνύματα έχουν διαβαστεί."
                        : "Τα μηνύματα από τη φόρμα επικοινωνίας θα εμφανιστούν εδώ."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {filteredContacts.map((item) => (
                      <ContactCard
                        key={item._id}
                        item={item}
                        onDownload={downloadFile}
                        onToggleRead={toggleContactRead}
                        onDelete={deleteContact}
                        onReply={replyToContact}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}