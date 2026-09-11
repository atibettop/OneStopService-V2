/* Public configuration only. Never place API keys here. */
const msLocalPreview = ['127.0.0.1','localhost'].includes(location.hostname) && location.port === '8090';
window.MS_SITE_CONFIG = Object.freeze({
  leadEndpoint: msLocalPreview ? 'http://' + location.hostname + ':8091/leads' : '',
  leadLocalPreview: msLocalPreview,
  company: { name: 'Muang Srisuk Group Co., Ltd.', phone: '098-146-5449', email: 'Thanannaphat.m@gmail.com', line: 'koiiikoi', address: '', officeHours: '', contactPerson: '' }
});
