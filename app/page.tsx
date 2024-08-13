import ImageApp from "@/components/imageApp";
import { data } from "autoprefixer";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <h1 className="mb-10 pt-28 text-4xl">新規登録</h1>
      {/* <Link href="/private">privateへ
      </Link> aタグの閉じタグを追加 */}
      <div className="flex-1 w-full flex flex-col items-center">
        日付を選択してください
        <ImageApp />
      </div>
    </>
  );
}
