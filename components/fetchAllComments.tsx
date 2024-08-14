import { supabase } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";

// コンポーネント内でデータを取得する関数
const useFetchAllComments = (user_id: string) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("latitude, longitude")
          .eq("id", user_id);

        if (error) {
          console.log(error);
          setError("データの取得に失敗しました");
          return;
        }

        setComments(data || []);
      } catch (err) {
        console.error(err);
        setError("予期しないエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    if (user_id) {
      fetchComments();
    }
  }, [user_id]);

  return { comments, loading, error };
};

export default useFetchAllComments;
