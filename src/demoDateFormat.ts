
import { format } from "date-fns";

//設定画面から項目をオンにする→スタート画面が出る

//設定項目がオンになったとき
export const openStartWindow = async () => {
  //今日の日付でフォーマットしてみる
  const today = new Date();

  const list = [
    "Localize",
    "MM/dd/yyyy",
    "dd-MM-yyyy",
    "dd.MM.yyyy",
    "yyyy/MM/dd",
    "MM-dd-yyyy",
    "MM/dd/yyyy",
    "MMM do, yyyy",
    "MMMM do, yyyy",
    "MM_dd_yyyy",
    "dd-MM-yyyy",
    "do MMM yyyy",
    "do MMMM yyyy",
    "yyyy-MM-dd",
    "yyyy-MM-dd EEEE",
    "yyyy/MM/dd",
    "yyyyMMdd",
    "yyyy_MM_dd",
    "yyyy年MM月dd日",
  ];

  let tr: [string] = [""];
  list.forEach((item) => tr.push(`<tr><td>${item}</td><td>${item === "Localize" ?
    today.toLocaleDateString("default", { weekday: "short", year: "numeric", month: "short", day: "numeric" }).replace(/,/g, "")
    : format(today, item)
    }</td></tr>`));
  //スタート画面を表示
  logseq.provideUI({
    key: "dateFormatDemo",
    attrs: {
      title: "All date format demo",
    },
    close: "outside",
    reset: true,
    //
    template: `
      <div>
      <table>
        <th>Date format</th><th>Today</th></tr>
        ${tr.join("\n")}
      </table>

      
      </div>
      <style>
        button#legacyDateFormatStartButton{
            background: var(--ls-block-properties-background-color--);
            border: 1px solid var(--ls-block-properties-text-color);
            border-radius: 5px;
            padding: 1em;
            user-select: none;
            font-size: 1.4em;
            color:var(--ls-link-ref-text-hover-color);
        }
      </style>
            `,
    style: {
      color: "var(--ls-primary-text-color)",
      background: "var(--ls-primary-background-color)",
      padding: "0.5em",
      margin: "0.2em",
      borderRadius: "5px",
      position: "fixed",
      top: "5em",
      right: "5em",
      zIndex: "1000",
      outline: "2px solid var(--ls-link-ref-text-hover-color)",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
      width: "500px",
      height: "820px",
    },
  });
};
