"use client"
import { supabase } from "@/utils/supabase/supabase"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

export default function ImageApp() {
  // 画像の公開URL
  const public_url = "https://spzlpfucuqkpjlucnnfh.supabase.co/storage/v1/object/public/public-image-bucket/img/"

  // ステート管理
  const [urlList, setUrlList] = useState<string[]>([]) // 画像URLリスト
  const [loadingState, setLoadingState] = useState("hidden") // ローディング状態
  const [comments, setComments] = useState<{ [key: string]: { comment: string; created_at: string }[] }>({}) // 画像ごとのコメント
  const [file, setFile] = useState<File>() // アップロードするファイル
  const [comment, setComment] = useState<string>("") // コメントの値
  const [errorMessage, setErrorMessage] = useState<string>("") // エラーメッセージ

  // 画像を全てリストする関数
  const listAllImage = async () => {
    const tempUrlList: string[] = [] // 一時的なURLリスト
    setLoadingState("flex justify-center") // ローディング状態を表示

    // Supabaseから画像リストを取得
    const { data, error } = await supabase
      .storage
      .from('public-image-bucket')
      .list("img", {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) {
      console.log(error) // エラーが発生した場合、コンソールにログを出力
      return
    }

    // 空のフォルダーを除外し、URLリストを作成
    for (let index = 0; index < data.length; index++) {
      if (data[index].name != ".emptyFolderPlaceholder") {
        tempUrlList.push(data[index].name)
      }
    }
    setUrlList(tempUrlList) // 画像URLリストをステートに設定
    await fetchAllComments(tempUrlList) // コメントを取得
    setLoadingState("hidden") // ローディング状態を隠す
  }

  // 画像に関連する全てのコメントを取得する関数
  const fetchAllComments = async (imageList: string[]) => {
    const tempComments: { [key: string]: { comment: string; created_at: string }[] } = {};
    for (const image of imageList) {
      const { data, error } = await supabase
        .from('comments')
        .select('comment, created_at') // コメントと追加日を取得
        .eq('image_name', image);

      if (error) {
        console.log(error);
        continue;
      }

      tempComments[image] = data.map((entry: { comment: string; created_at: string }) => ({
        comment: entry.comment,
        created_at: entry.created_at,
      }));
    }
    setComments(tempComments); // ステートに設定
  };

  // コンポーネントがマウントされたときに画像リストを取得
  useEffect(() => {
    (async () => {
      await listAllImage()
    })()
  }, [])

  // ファイル選択時に呼ばれる関数
  const handleChangeFile = (e: any) => {
    if (e.target.files.length !== 0) {
      setFile(e.target.files[0]); // 選択されたファイルをステートに設定
    }
  };

  // フォーム送信時に呼ばれる関数
  const onSubmit = async (event: any) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ

    if (!file) {
      alert("ファイルを選択してください。") // ファイルが選択されていない場合の警告
      return
    }

    if (!comment.trim()) {
      setErrorMessage("コメントは必須です。") // コメントが入力されていない場合のエラーメッセージ
      return
    }

    setLoadingState("flex justify-center") // ローディング状態を表示
    setErrorMessage("") // エラーメッセージをクリア

    const fileExtension = file.name.split(".").pop() // ファイル拡張子を取得
    const fileName = `${uuidv4()}.${fileExtension}` // 一意なファイル名を生成

    // Supabaseに画像をアップロード
    const { error: uploadError } = await supabase.storage
      .from('public-image-bucket')
      .upload(`img/${fileName}`, file)
    if (uploadError) {
      alert("エラーが発生しました：" + uploadError.message) // アップロードエラーの警告
      setLoadingState("hidden") // ローディング状態を隠す
      return
    }

    // コメントをデータベースに保存
    const { error: commentError } = await supabase
      .from('comments')
      .insert([{ image_name: fileName, comment, created_at: new Date() }]) // 日付も追加
    if (commentError) {
      alert("コメントの保存中にエラーが発生しました：" + commentError.message) // コメント保存エラーの警告
      setLoadingState("hidden") // ローディング状態を隠す
      return
    }

    // ステートをリセットし、再度画像リストを取得
    setFile(undefined)
    setComment("")
    await listAllImage()
    setLoadingState("hidden") // ローディング状態を隠す
  }

  return (
    <>
      {/* 画像アップロードフォーム */}
      <form className="mb-4 text-center" onSubmit={onSubmit}>
        <input
          className="relative mb-4 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
          type="file"
          id="formFile"
          accept="image/*"
          onChange={handleChangeFile} // ファイル選択時のハンドラー
        />
        <input
          type="text"
          className="relative mb-4 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out"
          placeholder="コメントを入力してください"
          value={comment} // コメントの値
          onChange={(e) => setComment(e.target.value)} // コメント入力時のハンドラー
        />
        {/* エラーメッセージの表示 */}
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <button type="submit" disabled={!file} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-25">
          送信
        </button>
      </form>
      {/* 画像とコメントの表示 */}
      <div className="w-full max-w-3xl">
        <div className={loadingState} aria-label="読み込み中">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
        <ul className="flex flex-wrap w-full">
          {urlList.map((item) => (
            <li className="w-1/4 h-auto p-1" key={item}>
              <a className="hover:opacity-50" href={public_url + item} target="_blank">
                <img className="object-cover max-h-32 w-full" src={public_url + item} alt={item} />
              </a>
              <ul className="mt-2">
                {comments[item]?.map((commentData, index) => ( // commentData に変更
                  <li key={index} className="text-sm text-gray-600">
                    {commentData.comment} {/* コメント */}
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date(commentData.created_at).toLocaleString()} {/* 追加日を表示 */}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

