# Makai Wars Server 

## Description
A private server for the mobile game Makai Wars using ExpressJS for the game API and NGINX for game asset files.

## Progress
### Roadmap
- [x] inital 70mb resource download 
- [ ] full 700mb resource download
- [ ] get into game
- [ ] Database to store player data
- [ ] Authentication Logic
- [ ] in-game actions
    - Coming soon
    - ...

Getting the game to work with the server has priority right now. Therefore only using mock data.  

### Issues
Both servers use self-signed certificates right now. The CA certificate has to be installed on the device for the time being.

There is probably a way to bundle the certificate within the app (networksecurityconfig). 

I dont know if I also have to emulate the tracking APIs. Some of them respond with data. Further testing is required.

Currently erroring out after trans data loading. Tested with official game API and own asset server and it works. Can safely say that the asset 
server works fine. Will do another API print from that point onward. Probably trying to connect to the app server. I dont
see any errors in logcat though.

Didnt look into unity stuff yet.


## API
The game does not use certificate pinning, reverse proxies or other means to obfuscate the API. A mitm proxy will allow to get insight to all the endpoints. 

The response data also does not use any third
party encryption.

API prints and response data will be hosted elsewhere.


