'use client';

import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  Filter,
  Menu,
  MessageCircle,
  PhoneCall,
  PlusCircle,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  facilityProvinceData,
  kpis,
  medicineSearches,
  navGroups,
  recentActivity,
  registrationTrend,
  revenueData,
  systemHealth,
  users,
  verifications,
} from '@/lib/admin-data';
import { roleLabels, type AdminRole } from '@/lib/rbac';

const currentRole: AdminRole = 'super_admin';

type WorkflowWindow = {
  title: string;
  group: string;
  subject?: string;
  mode?: string;
};

const workflowDetails: Record<string, { summary: string; steps: string[]; actions: string[]; records: string[] }> = {
  'User Management': {
    summary: 'Review patients, health workers, facilities and administrators with account status, safety notes and activity history.',
    steps: ['Search account', 'Open profile', 'Review permissions', 'Apply action', 'Record audit note'],
    actions: ['View profile', 'Suspend account', 'Reset access', 'Send notification'],
    records: ['Patient health ID linked', 'Recent appointment activity', 'Saved providers and orders', 'Community reports'],
  },
  'Verification Center': {
    summary: 'Process provider applications and keep only trusted healthcare workers and facilities visible to the public.',
    steps: ['Open application', 'Inspect documents', 'Call applicant if needed', 'Approve or reject', 'Notify applicant'],
    actions: ['Approve', 'Reject', 'Request more information', 'Assign reviewer'],
    records: ['License number', 'NRC or facility certificate', 'Physical address evidence', 'Professional registration'],
  },
  'Facility Management': {
    summary: 'Manage hospitals, pharmacies, labs and diagnostic centres exactly as they appear to patients on the app and website.',
    steps: ['Open facility profile', 'Check services and inventory', 'Review map location', 'Test booking and chat', 'Publish changes'],
    actions: ['Open full profile', 'Edit services', 'View bookings', 'Test patient flow'],
    records: ['Services offered', 'Operating hours', 'Map and GPS point', 'Ratings, delivery and contact channels'],
  },
  'Healthcare Worker Management': {
    summary: 'Manage verified doctors, pharmacists, nurses and allied professionals who answer questions and provide consultations.',
    steps: ['Open professional profile', 'Review registration', 'Check facility link', 'Inspect content and bookings', 'Update status'],
    actions: ['Open profile', 'Verify worker', 'View consultations', 'Message worker'],
    records: ['Profession and specialty', 'Registration number', 'Years of experience', 'Teleconsultation schedule'],
  },
  'Service Management': {
    summary: 'Configure medical service tiles, facility availability, prices and booking flows used by patients.',
    steps: ['Select service category', 'Edit service details', 'Attach facilities', 'Configure booking rules', 'Publish to app and web'],
    actions: ['Create service', 'Edit service', 'Preview patient flow', 'Open booking setup'],
    records: ['Patient services', 'Clinical diagnostics', 'Pharmacy services', 'Telemedicine and emergency services'],
  },
  'Medicine Management': {
    summary: 'Control medicine catalogue, brands, stock visibility, prescriptions and pharmacy inventory listings.',
    steps: ['Search medicine or brand', 'Open medicine detail', 'Review pharmacy stock', 'Check prescription rules', 'Publish catalogue'],
    actions: ['Add medicine', 'Edit inventory', 'Compare pharmacies', 'Flag medicine'],
    records: ['Generic name and brand', 'Manufacturer', 'Stock by pharmacy', 'Price and prescription status'],
  },
  'Community Management': {
    summary: 'Moderate posts, videos, comments, health questions, events, polls and reported content.',
    steps: ['Open reported content', 'Review author verification', 'Check comments', 'Take moderation action', 'Notify users'],
    actions: ['Approve post', 'Remove content', 'Warn author', 'Feature campaign'],
    records: ['Likes, comments and shares', 'Saved posts', 'Reports received', 'Provider follow activity'],
  },
  'Appointments & Telemedicine': {
    summary: 'Oversee appointment bookings, chat consultations, video calls and completed clinical sessions.',
    steps: ['Open appointment', 'Check patient and provider', 'Confirm schedule', 'Test video or chat', 'Close encounter'],
    actions: ['Open booking', 'Start test video', 'Call provider', 'Mark completed'],
    records: ['Calendar slot', 'Consultation mode', 'Payment or insurance status', 'Patient notes'],
  },
  'Subscriptions & Billing': {
    summary: 'Manage facility packages, health worker subscriptions, invoices, revenue and payment exceptions.',
    steps: ['Open billing account', 'Review plan', 'Check transactions', 'Resolve exception', 'Export receipt'],
    actions: ['Open invoice', 'Change plan', 'Export report', 'Send payment reminder'],
    records: ['Monthly revenue', 'Featured listings', 'Transactions', 'Facility subscription status'],
  },
  'AI Services': {
    summary: 'Monitor Caroline, symptom checker, dermatology AI, authenticity scanning and disease surveillance queues.',
    steps: ['Open AI queue', 'Review flagged result', 'Escalate clinical risk', 'Update safety label', 'Audit decision'],
    actions: ['Review queue', 'Escalate case', 'Disable result', 'Export AI audit'],
    records: ['Safety flags', 'Nearby provider recommendations', 'Medicine authenticity scans', 'Surveillance alerts'],
  },
  'Analytics & Reports': {
    summary: 'Open operational reports for users, facilities, medicines, revenue, community and platform growth.',
    steps: ['Choose report', 'Filter province or date', 'Inspect charts', 'Export file', 'Share with team'],
    actions: ['Open report', 'Export CSV', 'Export PDF', 'Schedule report'],
    records: ['User growth', 'Facility coverage', 'Medicine demand', 'Community engagement'],
  },
  'Audit & Security': {
    summary: 'Review administrator activity, login history, security events and sensitive data access.',
    steps: ['Open audit log', 'Filter event type', 'Inspect affected record', 'Apply security action', 'Export evidence'],
    actions: ['View audit log', 'Lock account', 'Rotate access', 'Export evidence'],
    records: ['Admin action trail', 'Login history', 'Permission changes', 'Sensitive record access'],
  },
  'System Settings': {
    summary: 'Configure platform roles, notification rules, moderation policy and operational settings.',
    steps: ['Open setting', 'Edit rule', 'Preview impact', 'Confirm change', 'Save audit note'],
    actions: ['Edit role', 'Update notification', 'Change moderation rule', 'Save setting'],
    records: ['Roles and permissions', 'Platform settings', 'Notification templates', 'Moderation rules'],
  },
  Dashboard: {
    summary: 'Use the control room to jump into each operational workflow and confirm the patient-facing experience is working.',
    steps: ['Review KPI', 'Open underlying records', 'Inspect related workflow', 'Take action', 'Track outcome'],
    actions: ['Open records', 'Export snapshot', 'Assign owner', 'Create task'],
    records: ['Pending verifications', 'Active consultations', 'Revenue trends', 'Provider coverage'],
  },
};

export default function AdminDashboardPage() {
  const [activeWindow, setActiveWindow] = useState<WorkflowWindow | null>(null);
  const openWindow = (window: WorkflowWindow) => setActiveWindow(window);
  const closeWindow = () => setActiveWindow(null);

  return (
    <main className="grid min-h-screen grid-cols-[300px_1fr] bg-slate-50 text-slate-950">
      <Sidebar openWindow={openWindow} />
      <section className="min-w-0">
        <Topbar openWindow={openWindow} />
        <div className="space-y-8 p-8">
          <Hero openWindow={openWindow} />
          <KpiGrid openWindow={openWindow} />
          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RegistrationChart openWindow={openWindow} />
            <ActivityPanel openWindow={openWindow} />
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            <ProvinceChart openWindow={openWindow} />
            <MedicineSearchChart openWindow={openWindow} />
            <RevenueChart openWindow={openWindow} />
          </div>
          <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
            <UserManagement openWindow={openWindow} />
            <VerificationCenter openWindow={openWindow} />
          </div>
          <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
            <SecurityPanel openWindow={openWindow} />
            <OperationsModules openWindow={openWindow} />
          </div>
        </div>
      </section>
      {activeWindow ? <WorkflowModal window={activeWindow} onClose={closeWindow} openWindow={openWindow} /> : null}
    </main>
  );
}

function Sidebar({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto border-r border-teal-100 bg-white p-5">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-medsearch-teal text-white">
          <ShieldCheck size={26} />
        </div>
        <div>
          <h1 className="text-lg font-black">MedSearch Admin</h1>
          <p className="text-xs font-semibold text-slate-500">Operations Centre</p>
        </div>
      </div>
      <nav className="space-y-2">
        {navGroups.map((group, index) => (
          <details className="group rounded-2xl bg-slate-50 open:bg-medsearch-mint" key={group.title} open={index < 5}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-bold text-slate-800">
              <span className="flex items-center gap-3">
                <group.icon size={18} className="text-medsearch-teal" />
                {group.title}
              </span>
              <ChevronDown size={16} className="transition group-open:rotate-180" />
            </summary>
            <div className="space-y-1 px-4 pb-3">
              {group.items.map((item) => (
                <button
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-500 hover:bg-white hover:text-medsearch-teal"
                  key={item}
                  onClick={() => openWindow({ title: item, group: group.title })}
                >
                  {item}
                </button>
              ))}
            </div>
          </details>
        ))}
      </nav>
    </aside>
  );
}

function Topbar({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-teal-100 bg-white/90 px-8 py-4 backdrop-blur">
      <div className="flex items-center gap-4">
        <button className="rounded-xl border border-slate-200 p-2">
          <Menu size={20} />
        </button>
        <label className="flex w-[460px] items-center gap-3 rounded-2xl border border-teal-100 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search users, facilities, medicines, approvals..."
            onFocus={() => openWindow({ title: 'Global Search', group: 'Dashboard', subject: 'Users, facilities, medicines and approvals' })}
          />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-2xl border border-teal-100 bg-white px-4 py-3 text-sm font-bold text-slate-700">
          {roleLabels[currentRole]}
        </button>
        <button className="rounded-2xl bg-medsearch-mint p-3 text-medsearch-teal" onClick={() => openWindow({ title: 'Notification Center', group: 'System Settings' })}>
          <Bell size={20} />
        </button>
        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">SA</div>
      </div>
    </header>
  );
}

function Hero({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <section className="rounded-[28px] bg-medsearch-teal p-8 text-white shadow-soft">
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="mb-3 rounded-full bg-white/15 px-3 py-1 text-sm font-bold">National healthcare marketplace control room</p>
          <h2 className="max-w-4xl text-4xl font-black leading-tight">
            Oversee users, providers, medicines, verifications, community safety, revenue and telemedicine operations.
          </h2>
          <p className="mt-4 max-w-3xl text-white/80">
            Built for MedSearch Zambia administrators, verification officers, moderators, operations teams, finance and data analysts.
          </p>
        </div>
        <div className="grid min-w-72 gap-3 rounded-3xl bg-white/12 p-4">
          {['84 pending verifications', '12 active consultations', 'ZMW 420k monthly revenue'].map((item) => (
            <button
              className="rounded-2xl bg-white/15 px-4 py-3 text-left text-sm font-bold hover:bg-white/25"
              key={item}
              onClick={() => openWindow({ title: item, group: item.includes('verification') ? 'Verification Center' : item.includes('consultation') ? 'Appointments & Telemedicine' : 'Subscriptions & Billing' })}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function KpiGrid({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <button
          className="rounded-3xl border border-teal-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
          key={kpi.label}
          onClick={() => openWindow({ title: kpi.label, group: kpi.label.includes('Medicine') ? 'Medicine Management' : kpi.label.includes('Revenue') ? 'Subscriptions & Billing' : kpi.label.includes('Facility') || kpi.label.includes('Pharmacies') || kpi.label.includes('Hospitals') ? 'Facility Management' : 'Dashboard' })}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">{kpi.label}</p>
              <h3 className="mt-2 text-3xl font-black">{kpi.value}</h3>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-medsearch-mint text-medsearch-teal">
              <kpi.icon size={24} />
            </span>
          </div>
          <p className="mt-4 text-sm font-bold text-emerald-600">{kpi.trend} growth trend</p>
        </button>
      ))}
    </section>
  );
}

function RegistrationChart({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <Card title="User registration trends" action="Export CSV" onAction={() => openWindow({ title: 'Registration Export', group: 'Analytics & Reports' })}>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={registrationTrend}>
            <defs>
              <linearGradient id="patients" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#1AA6A6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#1AA6A6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Area dataKey="patients" stroke="#1AA6A6" fill="url(#patients)" strokeWidth={3} />
            <Line dataKey="workers" stroke="#FF8A00" strokeWidth={3} />
            <Line dataKey="facilities" stroke="#2563eb" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function ActivityPanel({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <Card title="Recent platform activity">
      <div className="space-y-3">
        {recentActivity.map(([actor, action, time]) => (
          <button
            className="w-full rounded-2xl bg-slate-50 p-4 text-left hover:bg-medsearch-mint"
            key={`${actor}-${time}`}
            onClick={() => openWindow({ title: action, group: actor.includes('Verification') ? 'Verification Center' : actor.includes('Community') ? 'Community Management' : actor.includes('Finance') ? 'Subscriptions & Billing' : 'Audit & Security', subject: actor })}
          >
            <p className="font-black">{actor}</p>
            <p className="mt-1 text-sm text-slate-600">{action}</p>
            <p className="mt-2 text-xs font-bold text-medsearch-teal">{time}</p>
          </button>
        ))}
      </div>
    </Card>
  );
}

function ProvinceChart({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <Card title="Facilities by province" action="Open map" onAction={() => openWindow({ title: 'Facility Coverage Map', group: 'Facility Management' })}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={facilityProvinceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="province" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="facilities" fill="#1AA6A6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function MedicineSearchChart({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <Card title="Top searched medicines">
      <div className="space-y-3">
        {medicineSearches.map((medicine) => (
          <button className="block w-full text-left" key={medicine.name} onClick={() => openWindow({ title: medicine.name, group: 'Medicine Management', subject: 'Search demand and inventory' })}>
            <div className="mb-1 flex justify-between text-sm">
              <strong>{medicine.name}</strong>
              <span>{medicine.searches.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <span className="block h-2 rounded-full bg-medsearch-orange" style={{ width: `${medicine.searches / 28}%` }} />
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}

function RevenueChart({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <Card title="Monthly revenue" action="Open billing" onAction={() => openWindow({ title: 'Monthly Revenue', group: 'Subscriptions & Billing' })}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#FF8A00" strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function UserManagement({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <Card title="User management" action="View all" onAction={() => openWindow({ title: 'All Users', group: 'User Management' })}>
      <div className="mb-4 flex gap-3">
        <button className="inline-flex items-center gap-2 rounded-xl bg-medsearch-mint px-4 py-2 text-sm font-bold text-medsearch-teal" onClick={() => openWindow({ title: 'User Filters', group: 'User Management' })}>
          <Filter size={16} /> Filter
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600" onClick={() => openWindow({ title: 'Export Users', group: 'Analytics & Reports' })}>
          <Download size={16} /> Export
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {['User ID', 'Full Name', 'Phone', 'Email', 'Province', 'Status', 'Actions'].map((head) => (
                <th className="px-4 py-3" key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((row) => (
              <tr className="border-t border-slate-100" key={row[0]}>
                {row.map((cell) => (
                  <td className="px-4 py-3" key={cell}>{cell}</td>
                ))}
                <td className="px-4 py-3">
                  <button className="rounded-full bg-medsearch-teal px-3 py-1 text-xs font-bold text-white" onClick={() => openWindow({ title: row[1], group: 'User Management', subject: row[0], mode: 'profile' })}>View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function VerificationCenter({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <Card title="Verification center">
      <div className="space-y-4">
        {verifications.map((item) => (
          <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={item.name}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black">{item.name}</h3>
                <p className="text-sm text-slate-500">{item.type} · {item.status}</p>
              </div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">{item.status}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.documents.map((doc) => (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600" key={doc}>{doc}</span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="rounded-full bg-medsearch-teal px-4 py-2 text-xs font-bold text-white" onClick={() => openWindow({ title: item.name, group: 'Verification Center', mode: 'approve' })}>Approve</button>
              <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white" onClick={() => openWindow({ title: item.name, group: 'Verification Center', mode: 'reject' })}>Reject</button>
              <button className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600" onClick={() => openWindow({ title: item.name, group: 'Verification Center', mode: 'request-info' })}>Request More Information</button>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}

function SecurityPanel({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  return (
    <Card title="Audit & security">
      <div className="space-y-3">
        {systemHealth.map((item) => (
          <button className="flex w-full items-center justify-between rounded-2xl bg-slate-50 p-4 text-left hover:bg-medsearch-mint" key={item.label} onClick={() => openWindow({ title: item.label, group: 'Audit & Security' })}>
            <span className="flex items-center gap-3 font-bold">
              <item.icon size={18} className="text-medsearch-teal" />
              {item.label}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">{item.value}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

function OperationsModules({ openWindow }: { openWindow: (window: WorkflowWindow) => void }) {
  const modules = [
    ['Service Management', 'Create, edit and deactivate medical, telemedicine, pharmacy, laboratory and diagnostic services.'],
    ['Medicine Management', 'Manage generic names, brands, strengths, dosage forms, manufacturers, OTC status and featured products.'],
    ['Community Moderation', 'Review posts, videos, comments, reports, warnings and suspensions.'],
    ['Subscriptions & Billing', 'Monitor facility plans, transactions, revenue reports and payment exceptions.'],
    ['AI Services', 'Oversee dermatology AI, drug authenticity scanning, symptom checker and disease surveillance queues.'],
    ['Reports Export', 'Export analytics as PDF, Excel and CSV for operational review.'],
  ];

  return (
    <Card title="Operations modules">
      <div className="grid gap-4 md:grid-cols-2">
        {modules.map(([title, description]) => (
          <button className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left hover:border-medsearch-teal hover:bg-medsearch-mint" key={title} onClick={() => openWindow({ title, group: title })}>
            <h3 className="font-black">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </button>
        ))}
      </div>
    </Card>
  );
}

function WorkflowModal({
  window,
  onClose,
  openWindow,
}: {
  window: WorkflowWindow;
  onClose: () => void;
  openWindow: (window: WorkflowWindow) => void;
}) {
  const [step, setStep] = useState(0);
  const details = useMemo(() => workflowDetails[window.group] || workflowDetails.Dashboard, [window.group]);
  const currentStep = details.steps[step] || details.steps[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/45 p-6 backdrop-blur-sm">
      <section className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <header className="flex items-start justify-between border-b border-teal-100 bg-medsearch-mint p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-medsearch-teal">{window.group}</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">{window.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{window.subject || details.summary}</p>
          </div>
          <button className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-700 shadow-sm" onClick={onClose} aria-label="Close workflow">
            <X size={20} />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[280px_1fr]">
          <aside className="overflow-y-auto border-r border-teal-100 bg-slate-50 p-5">
            <button className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700" onClick={onClose}>
              <ArrowLeft size={16} /> Back to dashboard
            </button>
            <div className="space-y-3">
              {details.steps.map((item, index) => (
                <button
                  className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left text-sm font-bold ${index === step ? 'bg-medsearch-teal text-white' : 'bg-white text-slate-600 hover:bg-medsearch-mint'}`}
                  key={item}
                  onClick={() => setStep(index)}
                >
                  {index < step ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                  {item}
                </button>
              ))}
            </div>
          </aside>

          <div className="min-h-0 overflow-y-auto p-6">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-medsearch-teal">Current window</p>
                    <h3 className="text-2xl font-black">{currentStep}</h3>
                  </div>
                  <span className="rounded-full bg-medsearch-mint px-4 py-2 text-xs font-black text-medsearch-teal">Workflow active</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {details.actions.map((action) => (
                    <button
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left hover:border-medsearch-teal hover:bg-medsearch-mint"
                      key={action}
                      onClick={() => openWindow({ title: action, group: window.group, subject: `${action} for ${window.title}`, mode: action })}
                    >
                      <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-white text-medsearch-teal">
                        <ExternalLink size={18} />
                      </span>
                      <strong>{action}</strong>
                      <p className="mt-2 text-sm leading-6 text-slate-600">Open a focused admin window and continue this operational task.</p>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black">Record detail</h3>
                <div className="mt-4 space-y-3">
                  {details.records.map((record) => (
                    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4" key={record}>
                      <FileCheck2 className="mt-0.5 text-medsearch-teal" size={18} />
                      <div>
                        <p className="font-bold">{record}</p>
                        <p className="mt-1 text-sm text-slate-600">Available for review, edit, approval and audit tracking.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <ActionTile icon={Eye} title="Preview patient view" text="Open the matching app or web journey from the dashboard." onClick={() => openWindow({ title: 'Patient View Preview', group: window.group, subject: `Preview for ${window.title}` })} />
              <ActionTile icon={MessageCircle} title="Open communication" text="Review chat, comments, notifications or support messages." onClick={() => openWindow({ title: 'Communication Thread', group: window.group, subject: window.title })} />
              <ActionTile icon={PhoneCall} title="Contact or escalate" text="Call provider, assign reviewer or escalate to operations." onClick={() => openWindow({ title: 'Escalation Window', group: window.group, subject: window.title })} />
            </div>

            <section className="mt-6 rounded-3xl border border-teal-100 bg-slate-50 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black">Workflow outcome</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">The dashboard keeps the full flow inside MedSearch admin until the task is complete.</p>
                </div>
                <button className="rounded-full bg-medsearch-teal px-5 py-3 text-sm font-black text-white" onClick={() => setStep(Math.min(step + 1, details.steps.length - 1))}>
                  Continue workflow
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

function ActionTile({ icon: Icon, title, text, onClick }: { icon: typeof Eye; title: string; text: string; onClick: () => void }) {
  return (
    <button className="rounded-3xl border border-teal-100 bg-white p-5 text-left shadow-sm hover:border-medsearch-teal hover:bg-medsearch-mint" onClick={onClick}>
      <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-medsearch-mint text-medsearch-teal">
        <Icon size={20} />
      </span>
      <h3 className="font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </button>
  );
}

function Card({ title, action, onAction, children }: { title: string; action?: string; onAction?: () => void; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-black">{title}</h2>
        {action ? <button className="rounded-full bg-medsearch-mint px-4 py-2 text-xs font-black text-medsearch-teal" onClick={onAction}>{action}</button> : null}
      </div>
      {children}
    </section>
  );
}
