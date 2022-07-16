import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// PrimeVue
import PrimeVue from 'primevue/config';
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar';
import Tooltip from 'primevue/tooltip';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row'; 
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import SelectButton from 'primevue/selectbutton';
import Divider from 'primevue/divider';
import Sidebar from 'primevue/sidebar';
import RadioButton from 'primevue/radiobutton';
import Dropdown from 'primevue/dropdown';



import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

const app = createApp(App)
app.use(store)
app.use(router)

app.component('Button', Button)
app.component('Toolbar', Toolbar)
app.component('Dialog', Dialog)
app.component('InputText', InputText)
app.component('MultiSelect', MultiSelect)
app.component('DataTable', DataTable)
app.component('Dropdown', Dropdown)
app.component('Column', Column)
app.component('SelectButton', SelectButton)
app.component('Divider', Divider)
app.component('Sidebar', Sidebar)
app.component('RadioButton', RadioButton)
app.component('Row', Row)
app.use(ConfirmationService);
app.component('ConfirmDialog', ConfirmDialog)
app.use(ToastService);
app.component('Toast', Toast)
app.use(PrimeVue, {
  locale: {
    startsWith: 'Starts with',
    contains: 'Contains',
    notContains: 'Not contains',
    endsWith: 'Ends with',
    equals: 'Equals',
    notEquals: 'Not equals',
    noFilter: 'No Filter',
    lt: 'Less than',
    lte: 'Less than or equal to',
    gt: 'Greater than',
    gte: 'Greater than or equal to',
    dateIs: 'Date is',
    dateIsNot: 'Date is not',
    dateBefore: 'Date is before',
    dateAfter: 'Date is after',
    clear: 'Clear',
    apply: 'Apply',
    matchAll: 'Match All',
    matchAny: 'Match Any',
    addRule: 'Add Rule',
    removeRule: 'Remove Rule',
    accept: 'Yes',
    reject: 'No',
    choose: 'Choose',
    upload: 'Upload',
    cancel: 'Cancel',
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
    monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: 'Today',
    weekHeader: 'Wk',
    firstDayOfWeek: 0,
    dateFormat: 'mm/dd/yy',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordPrompt: 'Enter a password',
    emptyFilterMessage: 'No results found',
    emptyMessage: 'No available options'
}

})

app.directive('tooltip', Tooltip);

app.mount('#app')
