import permissions from './permissions.json';
type UserRole = keyof typeof permissions;

/**
 * Service to handle business logic related to roles and permissions.
 * This centralizes the logic away from middleware and controllers.
 */
class RoleService {
  /**
   * Checks if a given role has a specific permission.
   * @param role The role to check.
   * @param permission The permission to verify.
   * @returns True if the role has the permission, false otherwise.
   */
  public static hasPermission(role: UserRole, permission: string): boolean {
    if (role === 'SUPER_ADMIN') return true; // Super Admin has all permissions

    const rolePermissions = permissions[role] || [];
    return rolePermissions.includes(permission);
  }

  /**
   * Retrieves all permissions for a given role.
   * @param role The role to get permissions for.
   * @returns An array of permission strings.
   */
  public static getPermissionsForRole(role: UserRole): string[] {
    return permissions[role] || [];
  }
}

export default RoleService;
