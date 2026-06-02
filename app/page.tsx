'use client';

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
  Bell,
  ChevronDown,
  Download,
  Filter,
  Menu,
  Search,
  ShieldCheck,
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

export default function AdminDashboardPage() {
  return (
    <main className="grid min-h-screen grid-cols-[300px_1fr] bg-slate-50 text-slate-950">
      <Sidebar />
      <section className="min-w-0">
        <Topbar />
        <div className="space-y-8 p-8">
          <Hero />
          <KpiGrid />
          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RegistrationChart />
            <ActivityPanel />
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            <ProvinceChart />
            <MedicineSearchChart />
            <RevenueChart />
          </div>
          <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
            <UserManagement />
            <VerificationCenter />
          </div>
          <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
            <SecurityPanel />
            <OperationsModules />
          </div>
        </div>
      </section>
    </main>
  );
}

function Sidebar() {
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
                <button className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-500 hover:bg-white hover:text-medsearch-teal" key={item}>
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

function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-teal-100 bg-white/90 px-8 py-4 backdrop-blur">
      <div className="flex items-center gap-4">
        <button className="rounded-xl border border-slate-200 p-2">
          <Menu size={20} />
        </button>
        <label className="flex w-[460px] items-center gap-3 rounded-2xl border border-teal-100 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input className="w-full bg-transparent text-sm outline-none" placeholder="Search users, facilities, medicines, approvals..." />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-2xl border border-teal-100 bg-white px-4 py-3 text-sm font-bold text-slate-700">
          {roleLabels[currentRole]}
        </button>
        <button className="rounded-2xl bg-medsearch-mint p-3 text-medsearch-teal">
          <Bell size={20} />
        </button>
        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">SA</div>
      </div>
    </header>
  );
}

function Hero() {
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
            <div className="rounded-2xl bg-white/15 px-4 py-3 text-sm font-bold" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KpiGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <article className="rounded-3xl border border-teal-100 bg-white p-5 shadow-sm" key={kpi.label}>
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
        </article>
      ))}
    </section>
  );
}

function RegistrationChart() {
  return (
    <Card title="User registration trends" action="Export CSV">
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

function ActivityPanel() {
  return (
    <Card title="Recent platform activity">
      <div className="space-y-3">
        {recentActivity.map(([actor, action, time]) => (
          <div className="rounded-2xl bg-slate-50 p-4" key={`${actor}-${time}`}>
            <p className="font-black">{actor}</p>
            <p className="mt-1 text-sm text-slate-600">{action}</p>
            <p className="mt-2 text-xs font-bold text-medsearch-teal">{time}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ProvinceChart() {
  return (
    <Card title="Facilities by province">
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

function MedicineSearchChart() {
  return (
    <Card title="Top searched medicines">
      <div className="space-y-3">
        {medicineSearches.map((medicine) => (
          <div key={medicine.name}>
            <div className="mb-1 flex justify-between text-sm">
              <strong>{medicine.name}</strong>
              <span>{medicine.searches.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <span className="block h-2 rounded-full bg-medsearch-orange" style={{ width: `${medicine.searches / 28}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RevenueChart() {
  return (
    <Card title="Monthly revenue">
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

function UserManagement() {
  return (
    <Card title="User management" action="View all">
      <div className="mb-4 flex gap-3">
        <button className="inline-flex items-center gap-2 rounded-xl bg-medsearch-mint px-4 py-2 text-sm font-bold text-medsearch-teal">
          <Filter size={16} /> Filter
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
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
                  <button className="rounded-full bg-medsearch-teal px-3 py-1 text-xs font-bold text-white">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function VerificationCenter() {
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
              <button className="rounded-full bg-medsearch-teal px-4 py-2 text-xs font-bold text-white">Approve</button>
              <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white">Reject</button>
              <button className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600">Request More Information</button>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}

function SecurityPanel() {
  return (
    <Card title="Audit & security">
      <div className="space-y-3">
        {systemHealth.map((item) => (
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4" key={item.label}>
            <span className="flex items-center gap-3 font-bold">
              <item.icon size={18} className="text-medsearch-teal" />
              {item.label}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function OperationsModules() {
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
          <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={title}>
            <h3 className="font-black">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}

function Card({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-black">{title}</h2>
        {action ? <button className="rounded-full bg-medsearch-mint px-4 py-2 text-xs font-black text-medsearch-teal">{action}</button> : null}
      </div>
      {children}
    </section>
  );
}
