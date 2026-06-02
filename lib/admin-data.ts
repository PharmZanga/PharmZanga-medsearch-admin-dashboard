import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  BadgeCheck,
  Banknote,
  Bell,
  Bot,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  FileBarChart,
  FileText,
  FlaskConical,
  HeartPulse,
  Hospital,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareWarning,
  Pill,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
  Video,
} from 'lucide-react';

export type NavGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const navGroups: NavGroup[] = [
  { title: 'Dashboard', icon: LayoutDashboard, items: ['Overview'] },
  { title: 'User Management', icon: Users, items: ['Patients', 'Healthcare Workers', 'Facilities', 'Administrators'] },
  { title: 'Verification Center', icon: ShieldCheck, items: ['Healthcare Worker Applications', 'Facility Applications', 'Pending Reviews', 'Rejected Applications'] },
  { title: 'Facility Management', icon: Hospital, items: ['Hospitals', 'Pharmacies', 'Laboratories', 'Imaging Centres', 'Dental Clinics', 'Physiotherapy Centres'] },
  { title: 'Healthcare Worker Management', icon: Stethoscope, items: ['Doctors', 'Pharmacists', 'Pharmacy Technologists', 'Nurses', 'Clinical Officers', 'Nutritionists', 'Laboratory Scientists'] },
  { title: 'Service Management', icon: ClipboardCheck, items: ['Medical Services', 'Telemedicine Services', 'Pharmacy Services', 'Laboratory Services', 'Diagnostic Services'] },
  { title: 'Medicine Management', icon: Pill, items: ['Medicine Catalogue', 'Categories', 'OTC Products', 'Featured Products'] },
  { title: 'Community Management', icon: MessageSquareWarning, items: ['Posts', 'Videos', 'Events', 'Polls', 'Comments', 'Reported Content'] },
  { title: 'Appointments & Telemedicine', icon: Video, items: ['Upcoming Appointments', 'Active Consultations', 'Completed Consultations', 'Cancelled Appointments'] },
  { title: 'Subscriptions & Billing', icon: Banknote, items: ['User Subscriptions', 'Facility Subscriptions', 'Transactions', 'Revenue Reports'] },
  { title: 'AI Services', icon: Bot, items: ['Dermatology AI', 'Drug Authenticity Scanner', 'Symptom Checker', 'Disease Surveillance'] },
  { title: 'Analytics & Reports', icon: FileBarChart, items: ['User Analytics', 'Facility Analytics', 'Revenue Analytics', 'Medicine Analytics', 'Community Analytics'] },
  { title: 'Audit & Security', icon: LockKeyhole, items: ['Audit Logs', 'Login History', 'Admin Actions', 'Security Events'] },
  { title: 'System Settings', icon: Settings, items: ['Roles & Permissions', 'Platform Settings', 'Notification Settings', 'Content Moderation Rules'] },
];

export const kpis = [
  { label: 'Total Registered Users', value: '48,920', trend: '+12.4%', icon: Users },
  { label: 'Healthcare Workers', value: '3,842', trend: '+8.1%', icon: Stethoscope },
  { label: 'Health Facilities', value: '1,126', trend: '+5.6%', icon: Building2 },
  { label: 'Pharmacies', value: '482', trend: '+7.2%', icon: Pill },
  { label: 'Hospitals', value: '138', trend: '+3.4%', icon: Hospital },
  { label: 'Medicines Listed', value: '9,420', trend: '+18.6%', icon: FlaskConical },
  { label: 'Services Listed', value: '612', trend: '+6.9%', icon: ClipboardCheck },
  { label: 'Community Posts', value: '14,840', trend: '+21.2%', icon: FileText },
  { label: 'Telemedicine Appointments', value: '2,936', trend: '+15.7%', icon: Video },
  { label: 'Total Revenue', value: 'ZMW 1.84M', trend: '+9.8%', icon: Banknote },
  { label: 'Pending Verifications', value: '84', trend: '-6.0%', icon: ShieldCheck },
  { label: 'Pending Approvals', value: '132', trend: '+4.3%', icon: Bell },
];

export const registrationTrend = [
  { month: 'Jan', patients: 2200, workers: 240, facilities: 58 },
  { month: 'Feb', patients: 2800, workers: 310, facilities: 72 },
  { month: 'Mar', patients: 3300, workers: 380, facilities: 95 },
  { month: 'Apr', patients: 3900, workers: 410, facilities: 112 },
  { month: 'May', patients: 4600, workers: 520, facilities: 138 },
  { month: 'Jun', patients: 5400, workers: 610, facilities: 162 },
];

export const facilityProvinceData = [
  { province: 'Lusaka', facilities: 420 },
  { province: 'Copperbelt', facilities: 315 },
  { province: 'Southern', facilities: 148 },
  { province: 'Eastern', facilities: 116 },
  { province: 'Central', facilities: 96 },
  { province: 'Northern', facilities: 72 },
];

export const medicineSearches = [
  { name: 'Amoxicillin', searches: 2480 },
  { name: 'Paracetamol', searches: 2310 },
  { name: 'Insulin', searches: 1290 },
  { name: 'Metformin', searches: 1184 },
  { name: 'Cough Syrup', searches: 1082 },
];

export const revenueData = [
  { month: 'Jan', revenue: 180000 },
  { month: 'Feb', revenue: 220000 },
  { month: 'Mar', revenue: 280000 },
  { month: 'Apr', revenue: 310000 },
  { month: 'May', revenue: 360000 },
  { month: 'Jun', revenue: 420000 },
];

export const recentActivity = [
  ['Verification Officer', 'Approved Fine Pharmacy facility application', '8 min ago'],
  ['Community Moderator', 'Removed reported medicine misinformation post', '22 min ago'],
  ['Finance Manager', 'Exported May facility subscription report', '1 hr ago'],
  ['Operations Manager', 'Suspended inactive laboratory profile', '2 hrs ago'],
  ['Super Admin', 'Updated telemedicine permissions', '3 hrs ago'],
];

export const users = [
  ['USR-1021', 'Martha Tembo', '+260 966 222 111', 'martha@example.com', 'Lusaka', 'Active'],
  ['USR-1022', 'Brian Phiri', '+260 977 103 220', 'brian@example.com', 'Copperbelt', 'Active'],
  ['USR-1023', 'Jane Mwansa', '+260 955 882 771', 'jane@example.com', 'Southern', 'Suspended'],
  ['USR-1024', 'Chanda Kunda', '+260 977 883 122', 'chanda@example.com', 'Eastern', 'Active'],
];

export const verifications = [
  { name: 'Dr. Mwansa', type: 'Doctor', status: 'Under Review', documents: ['Professional License', 'National ID', 'Profile Photo'] },
  { name: 'Fine Pharmacy', type: 'Pharmacy', status: 'Submitted', documents: ['Facility License', 'Physical Address', 'Contact Information'] },
  { name: 'CarePlus Laboratory', type: 'Laboratory', status: 'Under Review', documents: ['Regulatory Registration', 'Facility License'] },
];

export const systemHealth = [
  { label: 'Authentication', value: 'Healthy', icon: BadgeCheck },
  { label: 'Firestore Sync', value: 'Active', icon: Activity },
  { label: 'Storage Uploads', value: 'Normal', icon: FileText },
  { label: 'Notifications', value: 'Queued', icon: Bell },
  { label: 'Telemedicine', value: '12 live', icon: HeartPulse },
];
