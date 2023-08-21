import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
//import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
//import ja from "./translations/ja.json";


/* main */
const main = () => {
  // (async () => {
  //   try {
  //     await l10nSetup({ builtinTranslations: { ja } });
  //   } finally {
  /* user settings */
  logseq.useSettingsSchema(settingsTemplate);
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);
  //   }
  // })();


};/* end_main */



/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
const settingsTemplate: SettingSchemaDesc[] = [

];


logseq.ready(main).catch(console.error);