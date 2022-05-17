# The sample app has its front and back

- back will run at port 3004 as defined in app.ts file
- front will run at port 3000 by default (if the port is free), the connection to back can be done from src/service/app.service.ts file
- there is no database setup and its using an static array with initial 2 elements, so every time the backend restarts, the list will be set to its initial (2 elements)
