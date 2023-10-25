import { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createPost(post: Pick<Post, "title" | "content">) {
  return await prisma.post.create({ data: post });
}
