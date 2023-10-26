import { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createPost(post: Pick<Post, "title" | "content">) {
  return await prisma.post.create({ data: post });
}

export async function loadAllPost() {
  return await prisma.post.findMany();
}

export async function getPostData(id: string) {
  return await prisma.post.findFirstOrThrow({ where: { id: id } });
}
