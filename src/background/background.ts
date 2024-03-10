import { setupAlarm } from './setupAlarm';

chrome.runtime.onInstalled.addListener(async () => {
  setupAlarm();
});

chrome.alarms.get('daily6PMAlarm', (alarm) => {
  if (!alarm) {
    setupAlarm();
  }
});

chrome.alarms.onAlarm.addListener(() => {
  const today = new Date().toDateString();
  chrome.storage.local.get([today], (result) => {
    if (!result[today]) {
      chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('/assets/btn.png'),
        title: '⚠️메일 작성 리마인더⚠️',
        message: '❗️❗️❗️업무 보고서 📧메일 보내기❗️❗️❗️',
      });
    }
  });
});