/* Published commercial schedules from the pre-redesign OneStopService site.
 * No statutory payroll rates are calculated here. */
(function(root,factory){const model=factory();if(typeof module==='object'&&module.exports)module.exports=model;else root.MSPricing=model;})(typeof window!=='undefined'?window:globalThis,function(){
 'use strict';
 const payrollPlans=[{key:'lite',name:'Lite',base:5000,rates:[80,65,50]},{key:'pro',name:'Pro',base:10000,rates:[100,90,70]},{key:'premium',name:'Premium',base:15000,rates:[120,100,80]}];
 const retainers=[{key:'starter',name:'Starter',monthly:9900,positions:2,candidates:15,replacementDays:30,media:0},{key:'professional',name:'Professional',monthly:17900,positions:3,candidates:25,replacementDays:60,media:2000},{key:'business',name:'Business',monthly:24900,positions:5,candidates:40,replacementDays:90,media:4000}];
 const successRates={general:15,specialist:18,manager:20,executive:25};
 function integer(value,max){if(String(value).trim()==='')return null;const n=Number(value);return Number.isSafeInteger(n)&&n>=1&&n<=max?n:null;}
 function money(value,max,allowZero){if(String(value).trim()==='')return null;const n=Number(value);return Number.isFinite(n)&&n>=(allowZero?0:.01)&&n<=max&&Math.abs(n*100-Math.round(n*100))<.00001?n:null;}
 function payroll(key,value){const n=integer(value,1000000),plan=payrollPlans.find(p=>p.key===key);if(!n||!plan)return null;const tier=n<=200?0:n<=500?1:2,extra=Math.max(0,n-30),rate=extra?plan.rates[tier]:0,monthly=plan.base+extra*rate;return {key,employees:n,base:plan.base,extra,rate,monthly,annual:monthly*12};}
 function retainer(key){const plan=retainers.find(p=>p.key===key);return plan?{...plan}:null;}
 function success(level,salary,otherAnnual,hires){const s=money(salary,10000000,false),o=money(otherAnnual,100000000,true),n=integer(hires,1000),percent=Object.prototype.hasOwnProperty.call(successRates,level)?successRates[level]:null;if(s===null||o===null||!n||!percent)return null;const annualCents=Math.round(s*100)*12+Math.round(o*100),feeCents=Math.round(annualCents*percent/100);return {level,salary:s,otherAnnual:o,hires:n,percent,annualIncome:annualCents/100,perHire:feeCents/100,total:feeCents*n/100};}
 return Object.freeze({payrollPlans,retainers,successRates,payroll,retainer,success});
});
