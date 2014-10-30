Drug Stock Warehouse Service
============================

Production Deployment
---------------------
Puppet can be used to setup a production instance of the drug-stock-service.

* Checkout the project from github: ```git clone https://github.com/jembi/drug-stock-service.git```

* Ensure that puppet is installed and setup with the following modules:
	* willdurand/nodejs
	* puppetlabs/mongodb

* Edit the env/drug-stock-service.pp manifest and set $home appropriately, as well as $source_dir to the project location
	* (Optionally) change the $node_env variable if required (e.g. to "preproduction" or "development")

* Run puppet:
	```
	cd env
	sudo puppet apply drug-stock-service.pp
	```

The drug-stock-service should now be up and running. It's setup as an upstart service, so can be started/stopped as follows:
```
sudo start drug-stock-service
sudo stop drug-stock-service
```

Deployment Updates
------------------
The puppet manifest will setup a ```deploy.sh``` script in the home directory. Running this script will trigger an update from GitHub.

* Configure the SOURCE_DIR variable in the script as well as the $source_dir variable in update/deploy.pp

* Ensure that git is setup with the correct credentials to pull from GitHub
	* One way to do this is to setup a ```.netrc``` file in the home directory with the following contents:
	```
	machine github.com
	login USER
	password PASSWORD
	```
