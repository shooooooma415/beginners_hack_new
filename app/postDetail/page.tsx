'use client';
import ImageApp from "@/components/imageApp";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { data } from "autoprefixer";
import Link from "next/link";

export default function Index() {
  const supabase = createClientComponentClient();
  supabase.auth.getUser()
  return (
    <>
      <h1 className="mb-10 pt-28 text-4xl">新規登録</h1>
      <div className="flex-1 w-full flex flex-col items-center">
        日付を選択してください
        <ImageApp />
      </div>
    </>
  );
}
