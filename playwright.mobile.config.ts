import { defineConfig,devices } from '@playwright/test';
export default defineConfig({testDir:'./tests/mobile',timeout:90000,workers:1,use:{baseURL:'http://127.0.0.1:4173',headless:true,trace:'retain-on-failure'},projects:[
 {name:'webkit-iphone',use:{...devices['iPhone 13'],viewport:{width:390,height:844},browserName:'webkit'}},
 {name:'android-edge',use:{...devices['Pixel 7'],viewport:{width:393,height:851},browserName:'chromium',channel:'msedge',launchOptions:{args:['--enable-unsafe-swiftshader']}}},
 {name:'small-phone-edge',use:{viewport:{width:320,height:568},hasTouch:true,isMobile:true,deviceScaleFactor:2,browserName:'chromium',channel:'msedge',launchOptions:{args:['--enable-unsafe-swiftshader']}}}
 ],webServer:{command:'npm run preview -- --port 4173 --strictPort',url:'http://127.0.0.1:4173',reuseExistingServer:true,timeout:30000}});

