import { PageEntity } from "@logseq/libs/dist/LSPlugin.user"

// クエリを実行
export const advancedQuery = async <T>(query: string, ...input: Array<string>): Promise<T | null> => {
  try {
    const result = await logseq.DB.datascriptQuery(query, ...input)
    return result?.flat() as T
  } catch (err) {
    console.warn("Query execution failed:", err)
    return null
  }
}

// ページ名からjournalDayを取得するクエリ
export const doesPageExistAsJournal = async (pageName: string, logseqVerMd: boolean): Promise<PageEntity["journalDay"] | null> => {
  const result = await advancedQuery<{ "journalDay": PageEntity["journalDay"] }[]>(`
    [:find (pull ?b [:block/journal-day])
     :in $ ?name
     :where
     [?b :block/${logseqVerMd === true ? "original-name" : "title"} ?name]
     [?b :block/journal-day ?journal-day]]`,
    `"${pageName}"`)
  return result?.[0]?.["journal-day"] ?? null
}
