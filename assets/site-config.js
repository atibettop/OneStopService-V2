/* Public configuration only. Never place API keys here. */
const msLocalPreview = ['127.0.0.1','localhost'].includes(location.hostname) && location.port === '8090';
window.MS_SITE_CONFIG = Object.freeze({
  leadEndpoint: msLocalPreview ? 'http://' + location.hostname + ':8091/leads' : '',
  leadLocalPreview: msLocalPreview,
  company: { name: 'HR Design Co., Ltd.', phone: '063-635-5552', email: 'Thanannaphat.m@gmail.com', line: '0636355552', address: '', officeHours: '', contactPerson: '' }
});
