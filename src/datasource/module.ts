import {NewRelicDSConfigCtrl} from './config_ctrl';
import {NewRelicDatasource} from './datasource';
import {NewRelicQueryCtrl} from './query_ctrl';

class NewRelicQueryOptionsCtrl {
  static templateUrl = 'datasource/partials/query.options.html';
}

export {
  NewRelicDatasource as Datasource,
  NewRelicQueryCtrl as QueryCtrl,
  NewRelicQueryOptionsCtrl as QueryOptionsCtrl,
  NewRelicDSConfigCtrl as ConfigCtrl
};
