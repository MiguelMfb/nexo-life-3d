import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',testIgnore:['**/mobile/**'],timeout:120000,workers:1,use:{baseURL:'http://127.0.0.1:4173',channel:'msedge',headless:true,launchOptions:{args:['--enable-unsafe-swiftshader']},viewport:{width:1440,height:900},trace:'retain-on-failure'},webServer:{command:'npm run preview -- --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:true,timeout:30000}});

