import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { static as staticFiles } from 'express';
import logger from 'morgan';
import { join } from 'path';
import health from './routes/health';
import info from './routes/info';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(staticFiles(join(__dirname, 'public')));

app.use('/', info);
app.use('/health', health);
app.use('/info', info);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send();
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send();
});

export default app;
