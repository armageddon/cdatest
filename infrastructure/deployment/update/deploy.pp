# Puppet manifest for deploying the latest drug-stock-service from GitHub

# Change source_dir to the drug-stock-service source location
$source_dir="/home/jembi/drug-stock-service"

# defaults for Exec
Exec {
	path => ["/bin", "/sbin", "/usr/bin", "/usr/sbin", "/usr/local/bin", "/usr/local/sbin", "/usr/local/node/node-default/bin/"],
	user => "root",
}

exec { "npm-install":
	cwd => "$source_dir",
	command => "npm install",
}

exec { "build":
	cwd => "$source_dir",
	command => "cake build",
	require => Exec["npm-install"],
}

exec { "stop-service":
	command => "stop drug-stock-service",
	require => Exec["build"]
}

exec { "start-service":
	command => "start drug-stock-service",
	require => Exec["stop-service"]
}
