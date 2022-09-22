
import 'vant/lib/index.css';
import { Icon, Button, CheckboxGroup, Checkbox, Popup, CellGroup, Cell, NumberKeyboard, Tab, Tabs, PullRefresh, List, Form, Field, Picker, Swipe, SwipeItem, Circle, Switch, Skeleton } from 'vant';
export default function loadComponent(app: any) {
  app.use(Icon);
  app.use(Button);
  app.use(CheckboxGroup);
  app.use(Checkbox);
  app.use(Popup);
  app.use(CellGroup);
  app.use(Cell);
  app.use(NumberKeyboard);
  app.use(Tabs);
  app.use(Tab);
  app.use(PullRefresh);
  app.use(List);
  app.use(Form);
  app.use(Field);
  app.use(Picker);
  app.use(Swipe);
  app.use(SwipeItem);
  app.use(Circle);
  app.use(Switch);
  app.use(Skeleton);
}
