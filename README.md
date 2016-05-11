# New Relic APM Datasource -  Custom Plugin
This is a simple datasource for use with the New Relic APM API. 

## Supported Version Information
This datasource has only been tested with Grafana Version 3.0.0-beta7 and higher. 

##To install and use

1. Add the contents of this repository to /usr/share/grafana/public/app/plugins/datasource/ and then
```
sudo restart grafana-server
```

2. Create a new datasource and select NewRelic from the drop down. You will need your Application ID, and API Key for the NewRelic API.

3. Create a new panel and set the datasource to NewRelic. Metrics take a namespace and optional value configuration. The namespaces must be exact match of the metric name, which can be found for your application [here](https://rpm.newrelic.com/api/explore/applications/metric_names)

This datasource supports aliases and altering the group by interval.
![Alias](http://i.imgur.com/ji0ODPV.png)

If you leave the value field blank, you will get a separate group for each value of the metric. You can access the value as $value in the alias.
![Alias](http://i.imgur.com/GluLjfq.png)
