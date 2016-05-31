import {NewRelicDatasource} from './datasource';
import {NewRelicQueryCtrl} from './query_ctrl';

class NewRelicConfigCtrl {
  static templateUrl = 'partials/config.html';
}

class NewRelicQueryOptionsCtrl {
  static templateUrl = 'partials/query.options.html';
}

export {
  NewRelicDatasource as Datasource,
  NewRelicQueryCtrl as QueryCtrl,
  NewRelicQueryOptionsCtrl as QueryOptionsCtrl,
  NewRelicConfigCtrl as ConfigCtrl
};
