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

// フィールドを取得するクエリ
const createBaseQuery = (field: string): string => `
  [:find (pull ?b [:block/${field}])
   :in $ ?name
   :where
   [?b :block/original-name ?name]
   [?b :block/${field} ?${field}]] 
`

// ページ名からjournalDayを取得するクエリ
export const doesPageExistAsJournal = async (pageName: string): Promise<PageEntity["journalDay"] | null> => {
  const result = await advancedQuery<{ "journalDay": PageEntity["journalDay"] }[]>(createBaseQuery("journal-day"), `"${pageName}"`)
  return result?.[0]?.["journal-day"] ?? null
}
