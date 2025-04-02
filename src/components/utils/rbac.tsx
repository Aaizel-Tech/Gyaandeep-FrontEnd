// Role-based access control utilities
// File: /utils/rbac.ts

import { ReactNode } from "react";
import { useAuth } from "../auth/AuthProvider";

// Define permissions mapping based on GIGW requirements
export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard:view",
  DASHBOARD_EDIT: "dashboard:edit",
  DASHBOARD_MANAGE: "dashboard:manage",
  MEDIA_VIEW: "media:view",
  MEDIA_CREATE: "media:create",
  MEDIA_EDIT: "media:edit",
  MEDIA_DELETE: "media:delete",
  REPORT_VIEW: "report:view",
  REPORT_CREATE: "report:create",
  REPORT_EXPORT: "report:export",
  ALERT_VIEW: "alert:view",
  ALERT_CREATE: "alert:create",
  ALERT_MANAGE: "alert:manage",
  USER_VIEW: "user:view",
  USER_CREATE: "user:create",
  USER_EDIT: "user:edit",
  USER_DELETE: "user:delete",
  CONFIG_VIEW: "config:view",
  CONFIG_EDIT: "config:edit",
  MINISTRY_MANAGE: "ministry:manage",
} as const;

type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Role structure
interface Role {
  name: string;
  description: string;
  permissions: Permission[];
}

// Predefined role templates
export const ROLE_TEMPLATES: Record<string, Role> = {
  ADMIN: {
    name: "Administrator",
    description: "Full system access",
    permissions: Object.values(PERMISSIONS),
  },
  EDITOR: {
    name: "Editor",
    description: "Can manage content and reports",
    permissions: [
      PERMISSIONS.DASHBOARD_VIEW,
      PERMISSIONS.MEDIA_VIEW,
      PERMISSIONS.MEDIA_CREATE,
      PERMISSIONS.MEDIA_EDIT,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.REPORT_CREATE,
      PERMISSIONS.REPORT_EXPORT,
      PERMISSIONS.ALERT_VIEW,
    ],
  },
  MINISTRY_USER: {
    name: "Ministry User",
    description: "Ministry-specific access",
    permissions: [
      PERMISSIONS.DASHBOARD_VIEW,
      PERMISSIONS.MEDIA_VIEW,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.REPORT_EXPORT,
      PERMISSIONS.ALERT_VIEW,
    ],
  },
  JOURNALIST_CURATOR: {
    name: "Journalist Curator",
    description: "Specialist role for content curation",
    permissions: [
      PERMISSIONS.DASHBOARD_VIEW,
      PERMISSIONS.MEDIA_VIEW,
      PERMISSIONS.MEDIA_CREATE,
      PERMISSIONS.MEDIA_EDIT,
      PERMISSIONS.REPORT_VIEW,
    ],
  },
  ANALYST: {
    name: "Analyst",
    description: "Focused on data analysis and reports",
    permissions: [
      PERMISSIONS.DASHBOARD_VIEW,
      PERMISSIONS.MEDIA_VIEW,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.REPORT_CREATE,
      PERMISSIONS.REPORT_EXPORT,
      PERMISSIONS.ALERT_VIEW,
    ],
  },
  VIEWER: {
    name: "Viewer",
    description: "Read-only access to dashboard",
    permissions: [
      PERMISSIONS.DASHBOARD_VIEW,
      PERMISSIONS.MEDIA_VIEW,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.ALERT_VIEW,
    ],
  },
};

// User interface
type User = {
  permissions: Permission[];
};

// Helper functions
export const hasPermission = (
  user: User | null,
  permission: Permission
): boolean => {
  return !!user?.permissions.includes(permission);
};

export const hasAnyPermission = (
  user: User | null,
  permissions: Permission[]
): boolean => {
  return !!user?.permissions.some((perm) => permissions.includes(perm));
};

export const hasAllPermissions = (
  user: User | null,
  permissions: Permission[]
): boolean => {
  return !!user?.permissions.every((perm) => permissions.includes(perm));
};

// Component to conditionally render based on permissions
interface PermissionGateProps {
  children: ReactNode;
  permission?: Permission;
  anyPermissions?: Permission[];
  allPermissions?: Permission[];
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  permission,
  anyPermissions,
  allPermissions,
}) => {
  const { user } = useAuth();

  if (permission && !hasPermission(user, permission)) return null;
  if (anyPermissions && !hasAnyPermission(user, anyPermissions)) return null;
  if (allPermissions && !hasAllPermissions(user, allPermissions)) return null;

  return <>{children}</>;
};
