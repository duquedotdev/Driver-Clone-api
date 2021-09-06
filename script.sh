 #!/bin/bash
  cd ~/app/api
  yarn
  yarn migrations:run
  pm2 restart crud_api
