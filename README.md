# New Relic APM Datasource -  Custom Plugin
This is a simple datasource for use with the New Relic APM API. 

## Major Update Notice
This datasource plugin has been converted to a full app plugin to allow for more secure handling of 
new relic API keys. If you have previously used the old datasource plugin version, you will need to
configure this application with your api key, and then create a new datasource.

## Supported Version Information
This datasource has been tested with 4.2 stable.

## To install and use

1. Add the contents of this repository to your grafana plugins directory (default /var/lib/grafana/plugins) and then restart the grafana server.

2. Create a new app and configure it with your API key

2. Create a new datasource and select NewRelic from the drop down.

3. Create a new panel and set the datasource to NewRelic. Metrics take a namespace and optional value configuration. The namespaces must be exact match of the metric name, which can be found for your application [here](https://rpm.newrelic.com/api/explore/applications/metric_names)

This datasource supports aliases and altering the group by interval.
![Alias](http://i.imgur.com/sV0bEoA.png)

If you leave the value field blank, you will get a separate group for each value of the metric. You can access the value as $value in the alias.

