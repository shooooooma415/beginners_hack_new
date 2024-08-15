'use client'
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Comment {
  comment: string;
  event_date: string; // 修正：created_at から event_date に変更
}

export default function PrivateImageApp() {
  const [user_id, setUserId] = useState<string>("");
  const public_url = `https://xydxmymbedqcfqzzjmgk.supabase.co/storage/v1/object/public/public-image-bucket/img/${user_id}/`;

  const [urlList, setUrlList] = useState<string[]>([]);
  const [loadingState, setLoadingState] = useState("hidden");
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});

  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getUser().then((user) => { 
      if (user.data.user === null) {
        // ユーザーがサインインしていない場合、警告を表示
        return alert("ログインしてください");
      }
      setUserId(user.data.user.id);
    });
  }, []);

  const listAllImage = async () => {
    const tempUrlList: string[] = [];
    setLoadingState("flex justify-center");

    const { data, error } = await supabase
      .storage
      .from('public-image-bucket')
      .list(`img/${user_id}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) {
      console.log(error);
      return;
    }

    for (let index = 0; index < data.length; index++) {
      if (data[index].name !== ".emptyFolderPlaceholder") {
        tempUrlList.push(data[index].name);
      }
    }
    setUrlList(tempUrlList);
    await fetchAllComments(tempUrlList);
    setLoadingState("hidden");
  };

  const fetchAllComments = async (imageList: string[]) => {
    const tempComments: { [key: string]: Comment[] } = {};
    for (const image of imageList) {
      const { data, error } = await supabase
        .from('comments')
        .select('comment, event_date') // 修正：created_at を event_date に変更
        .eq('image_name', image);

      if (error) {
        console.log(error);
        continue;
      }

      tempComments[image] = data.map((entry) => ({
        comment: entry.comment,
        event_date: entry.event_date,
      }));
    }
    setComments(tempComments);
  };

  useEffect(() => {
    if (user_id) {
      listAllImage();
    }
  }, [user_id]);

  return (
    <div className="w-screen max-w-3xl">
      <div className={loadingState} aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
      <ul className="flex flex-wrap w-full">
        {urlList.map((item) => (
          <li className="h-auto p-1" style={{width: "33%"}} key={item}>
            <a className="hover:opacity-50" href={public_url + item} target="_blank">
              <img className="object-cover" style={{aspectRatio: 1/1}} src={public_url + item} alt={item} />
            </a>
            <ul className="mt-2">
              {comments[item]?.map((commentData, index) => (
                <li key={index} className="text-sm ">
                  <li>{commentData.comment}</li>
                  <span className="text-xs subText  ml-2">
                    日付: {commentData.event_date} {/* 修正：created_at を event_date に変更 */}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
