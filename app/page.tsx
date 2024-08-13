import ImageApp from "@/components/imageApp";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <h1 className="mb-4 pt-28 text-4xl">画像投稿アプリ</h1>
      <Link href="/private">privateへ
      </Link> {/* aタグの閉じタグを追加 */}
      
      <div className="flex-1 w-full flex flex-col items-center">
        <ImageApp />
      </div>
    </>
  );
}
