Tweet  Service
============================

onsumes a twitter feed and generates events 

Installation
------------
See the ```infrastructure``` folder for details on setting up the service using Vagrant/Puppet.
Note: Use express 3.x as express 4.x requires manual installation of middleware 

Running the server
------------------
Configure the MongoDB properties, and other settings, in ```conf/```. The file ```conf/prod.json``` will be used unless NODE_ENV is set to either "development" or "preproduction".

Simply run the service as follows:
```
node lib/service.js
```

