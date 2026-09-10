const {spawnSync}=require('node:child_process');
for(const file of ['test-experience.cjs','test-navigation.cjs','test-quote-handoff.cjs']){const r=spawnSync(process.execPath,[require('node:path').join(__dirname,file)],{stdio:'inherit',env:process.env});if(r.status!==0)process.exit(r.status||1);}
