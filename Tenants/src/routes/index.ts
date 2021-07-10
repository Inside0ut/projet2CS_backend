import { Router } from 'express';
import {getTenants,banTenantAccount} from '../controllers/Tenant';

const router = Router();
router.get('/tenant/all',getTenants) ;/**get all tenants */
router.put('/banTenantAccount',banTenantAccount) ;/**get all tenants */

export default router;