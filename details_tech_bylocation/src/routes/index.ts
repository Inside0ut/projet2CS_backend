import { Router } from 'express';
import {  add_techDetails_ByLocation, get,getVehicleInfos ,getRentalInfo,createVehicleState} from '../controllers/tech_details_Location';

const router = Router();


router.get('/', get);
router.post('/AddTechDetails', add_techDetails_ByLocation);
router.get('/getVehicleInformations', getVehicleInfos);
router.get('/getRentalInfo', getRentalInfo);
router.post('/createVS', createVehicleState);


export default router;
