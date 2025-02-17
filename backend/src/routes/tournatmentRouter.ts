import express, { Router } from 'express';
import {
  createTournament,
  getBracketStateForUser,
  getInviteCodeInfo,
  getTournamentDetails,
  getTournamentInviteCode,
  joinTournament,
  leaveTournament,
  makePrediction,
} from '../controllers/tournamentController';
import { isUserAuthenticated } from '../middleware/auth';
import errorSafe from '../errors/errorHandler';

const router: Router = express.Router();
router
  .route('/v1/tournament/create')
  .post(errorSafe(isUserAuthenticated, createTournament));
router
  .route('/v1/invite/:code')
  .get(errorSafe(isUserAuthenticated, getInviteCodeInfo));
router
  .route('/v1/invite/:code/accept')
  .post(errorSafe(isUserAuthenticated, joinTournament));
router
  .route('/v1/tournament/:id')
  .get(errorSafe(isUserAuthenticated, getTournamentDetails));
router
  .route('/v1/tournament/:id/leave')
  .post(errorSafe(isUserAuthenticated, leaveTournament));
router
  .route('/v1/tournament/:id/generate-invite-code')
  .post(errorSafe(isUserAuthenticated, getTournamentInviteCode));
router
  .route('/v1/tournament/:id/prediction')
  .post(errorSafe(isUserAuthenticated, makePrediction));
router
  .route('/v1/tournament/:id/bracket/:user')
  .get(errorSafe(isUserAuthenticated, getBracketStateForUser));
export default router;
