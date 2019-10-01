# CamundaModeler

### Setup Camunda Server
Navigate to `camundaServer` in the terminal and run `sh start-camunda.sh` to start the camunda server. 
Run `sh shutdown-camunda.sh` to stop the camunda server.
The camunda server has already has been modified for proper CORS permissions.

If, for whatever reason, you've replaced the files for the server, go to: 

`camundaServer/server/apache-tomcat-9.0.19/webapps/engine-rest/WEB-INF/web.xml`

and add the following code to the beginning of the file (but inside the openining `web-app` tag):

```
<filter>
  <filter-name>CorsFilter</filter-name>
  <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>    
  <init-param>
    <param-name>cors.allowed.origins</param-name>
    <param-value>*</param-value>
  </init-param>
</filter>
<filter-mapping>
  <filter-name>CorsFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```  

### Running the Angular App

As always, run `ng serve` to get the angular app up and running.
