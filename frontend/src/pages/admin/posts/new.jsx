// src/pages/admin/posts/new.jsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabase/client";

export default function NewPostRedirect() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const user = (await supabase.auth.getUser()).data?.user;
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      // create a draft post and redirect to editor
      const { data, error } = await supabase
        .from("posts")
        .insert({
          title: "Untitled",
          slug: `untitled-${Date.now()}`,
          author_id: user.id,
          status: "draft",
          is_published: false,
        })
        .select("id")
        .single();
      if (error) {
        console.error(error);
        router.push("/admin/posts");
        return;
      }
      router.replace(`/admin/posts/${data.id}`);
    })();
  }, [router]);
  return <div style={{ padding: 24 }}>Creating post…</div>;
}
