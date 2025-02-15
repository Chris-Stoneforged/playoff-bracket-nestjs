import './instrument';
import express, { Express } from 'express';
import authRouter from './routes/userRouter';
import tournamentRouter from './routes/tournatmentRouter';
import adminRouter from './routes/adminRouter';
import bracketRouter from './routes/bracketRouter';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errors';
import securityHeaders from './middleware/security';
import rateLimiter from './middleware/rateLimit';
import path from 'path';
import * as Sentry from '@sentry/node';

const app: Express = express();

app.use(rateLimiter({ hitLimit: 30, timeOutMillis: 10000 }));
app.use(securityHeaders);
app.use(express.json());

// Routes
app.use('/api', authRouter);
app.use('/api', tournamentRouter);
app.use('/api', bracketRouter);
app.use('/api/admin', adminRouter);

// Serve react app
app.use(express.static(path.resolve(__dirname, '../../../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../frontend', 'index.html'));
});

// Sentry
if (process.env.ENV == 'PRODUCTION') {
  Sentry.setupExpressErrorHandler(app);
}

// Middleware
app.use(cookieParser());
app.use(errorHandler);

export default app;
