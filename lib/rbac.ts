export type AdminRole =
  | 'super_admin'
  | 'verification_officer'
  | 'community_moderator'
  | 'operations_manager'
  | 'finance_manager'
  | 'data_analyst';

export const roleLabels: Record<AdminRole, string> = {
  super_admin: 'Super Admin',
  verification_officer: 'Verification Officer',
  community_moderator: 'Community Moderator',
  operations_manager: 'Operations Manager',
  finance_manager: 'Finance Manager',
  data_analyst: 'Data Analyst',
};

export const permissionsByRole: Record<AdminRole, string[]> = {
  super_admin: ['*'],
  verification_officer: ['verify_workers', 'verify_facilities', 'view_users'],
  community_moderator: ['moderate_posts', 'moderate_comments', 'view_reports'],
  operations_manager: ['manage_facilities', 'manage_services', 'manage_appointments'],
  finance_manager: ['view_revenue', 'manage_subscriptions', 'export_finance_reports'],
  data_analyst: ['view_analytics', 'export_reports'],
};

export function canAccess(role: AdminRole, permission: string) {
  const permissions = permissionsByRole[role] ?? [];
  return permissions.includes('*') || permissions.includes(permission);
}
