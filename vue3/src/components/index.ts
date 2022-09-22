import Button from './Button/index.vue';
import Uploader from './Uploader/index.vue';
import CityArea from './CityArea/index.vue';
import Popup from './Popup/index.vue';
import Cell from './Cell/index.vue';
import Notice from './Notice/index.vue';
import Buka from './Buka/index.vue';
import Label from './Label/index.vue';

const components = [
  {
    name: 'common-button',
    module: Button
  },
  {
    name: 'common-uploader',
    module: Uploader
  },
  {
    name: 'common-city-area',
    module: CityArea
  },
  {
    name: 'common-popup',
    module: Popup
  },
  {
    name: 'common-cell',
    module: Cell
  },
  {
    name: 'common-notice',
    module: Notice
  },
  {
    name: 'common-buka',
    module: Buka
  },
  {
    name: 'common-label',
    module: Label
  }
]

const install = (app: any) => {
  components.forEach(component => {
    app.component(component.name, component.module);
  });
};

export default install;
