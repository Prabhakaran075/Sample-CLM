// FIX: Import specific types from Express for proper type checking.
import { Request, Response, NextFunction } from 'express';

/**
 * In a real multi-tenant app with subdomains (e.g., acme.simpleclm.app),
 * this middleware would extract the subdomain ('acme') and find the
 * corresponding tenantId from the database.
 * 
 * For this MVP, we rely on the tenantId being embedded in the JWT.
 */
export const resolveTenantFromSubdomain = (req: Request, res: Response, next: NextFunction) => {
    const host = req.headers.host || '';
    const subdomain = host.split('.')[0];
    
    // TODO: Add logic to look up tenant by subdomain
    console.log(`Request received for subdomain: ${subdomain}`);
    
    // If found, you could attach it to the request:
    // req.tenantId = foundTenant.id;

    next();
};