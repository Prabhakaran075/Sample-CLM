
import express from 'express';
import permissions from './permissions.json';

type UserRole = keyof typeof permissions;

/**
 * A more granular authorization middleware that checks for specific permissions.
 * It reads the user's role from the request object (attached by the `protect` middleware)
 * and verifies if that role has the required permission defined in `permissions.json`.
 *
 * @param requiredPermission The permission string required to access the route (e.g., 'contracts:create').
 */
export const authorize = (requiredPermission: string) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Mocking user role for demonstration, as 'protect' middleware uses a mock user.
    // In a real implementation, req.user.role would come from the database via the token.
    const userRole: UserRole = req.user?.role || 'VIEWER'; 
    
    const userPermissions: string[] = permissions[userRole] || [];

    if (userPermissions.includes(requiredPermission)) {
      next(); // User has the required permission, proceed to the controller
    } else {
        // For Super Admin, grant all access. In a real system, this logic could be more complex.
        if (userRole === 'SUPER_ADMIN') {
            return next();
        }
      res.status(403).json({
        // FIX: Explicitly cast userRole to string to prevent implicit conversion error.
        message: `Forbidden: Your role ('${String(userRole)}') does not have the required permission ('${requiredPermission}') to access this resource.`,
      });
    }
  };
};
