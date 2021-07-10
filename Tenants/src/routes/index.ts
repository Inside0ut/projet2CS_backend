import { Router } from 'express';
import {getTenants,banTenantAccount,getTenantsInfo} from '../controllers/Tenant';

const router = Router();
router.get('/tenant/all',getTenants) ;/**get all tenants */
router.put('/banTenantAccount',banTenantAccount) ;
router.get('/getTenants',getTenantsInfo) ;/**get all tenants with all information  */


export default router;