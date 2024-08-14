'use client';
import ImageApp from "./imageApp";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import "./style.css"


export default function Index() {
  const supabase = createClientComponentClient();
  supabase.auth.getUser()
  return (
    <>
      <h1 className="NewPost">新規投稿</h1>
      <div className="date">
        <ImageApp />
      </div>
    </>
  );
}
