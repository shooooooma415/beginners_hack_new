'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase";

interface Comment {
  comment: string;
  created_at: string;
}

export default function PrivateImageApp() {
  const public_url = "https://spzlpfucuqkpjlucnnfh.supabase.co/storage/v1/object/public/public-image-bucket/img/";

  const [eventDate, setEventDate] = useState<string>("");
  const [urlList, setUrlList] = useState<string[]>([]);
  const [loadingState, setLoadingState] = useState("hidden");
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});

  const listAllImage = async () => {
    const tempUrlList: string[] = [];
    setLoadingState("flex justify-center");

    const { data, error } = await supabase
      .storage
      .from('public-image-bucket')
      .list("img", {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) {
      console.log(error);
      return;
    }

    for (let index = 0; index < data.length; index++) {
      if (data[index].name != ".emptyFolderPlaceholder") {
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
        .select('comment, created_at')
        .eq('image_name', image);

      if (error) {
        console.log(error);
        continue;
      }

      tempComments[image] = data.map((entry: Comment) => ({
        comment: entry.comment,
        created_at: entry.created_at,
      }));
    }
    setComments(tempComments);
  };

  useEffect(() => {
    listAllImage();
  }, []);

  return (
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
              {comments[item]?.map((commentData, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {commentData.comment}
                  <span className="text-xs text-gray-400 ml-2">
                    {/* {new Date(commentData.created_at).toLocaleString()} */}
                    <li> 日付:{commentData.event_date} {/* 追加 */}</li>
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
