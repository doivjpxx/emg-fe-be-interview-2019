import app from './app';
import { SERVER } from './configs/def.constant';

app.listen(SERVER.PORT, () => {
  console.log('Express server listening on port ' + SERVER.PORT);
});
