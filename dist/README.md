# New Relic APM Datasource -  Custom Plugin
This is a simple datasource for use with the New Relic APM API. 

## Security Information
This data source should not be used over http or if you may have malicious authorized users.
Updates are in progres to add an option for proxying requests to NR to increase the security of this plugin.

## Supported Version Information
This datasource has only been tested with Grafana Version 3.0.0-beta7 and 3.0.1 stable and higher.

##To install and use

1. Add the contents of this repository to your grafana plugins directory (default /var/lib/grafana/plugins) and then restart the grafana server.

2. Create a new datasource and select NewRelic from the drop down. You will need your Application ID, and API Key for the NewRelic API.

3. Create a new panel and set the datasource to NewRelic. Metrics take a namespace and optional value configuration. The namespaces must be exact match of the metric name, which can be found for your application [here](https://rpm.newrelic.com/api/explore/applications/metric_names)

This datasource supports aliases and altering the group by interval.
![Alias](http://i.imgur.com/sV0bEoA.png)

If you leave the value field blank, you will get a separate group for each value of the metric. You can access the value as $value in the alias.

