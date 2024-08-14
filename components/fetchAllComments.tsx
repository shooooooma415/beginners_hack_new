
import { supabase } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";


const [user_id, setUserId] = useState<string>("");


useEffect(() => {
  supabase.auth.getUser().then((user) => { 
    if (user.data.user === null) {
      return alert("ログインしてください");
    }
    setUserId(user.data.user.id);
  });
}, []);

export const fetchAllComments = async () => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id",user_id); //現在ログイン中のユーザーのテーブルを取得

  if (error) {
    console.log(error);
    return []; // エラーが発生した場合は空の配列を返す
  }

  return data; // 取得した緯度経度のリストを返す
};

export default fetchAllComments;