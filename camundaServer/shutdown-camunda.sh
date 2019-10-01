#!/bin/sh

export CATALINA_HOME="$(dirname "$0")/server/apache-tomcat-9.0.19"

/bin/sh "$(dirname "$0")/server/apache-tomcat-9.0.19/bin/shutdown.sh"
