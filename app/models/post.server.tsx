import { Post } from "@prisma/client";
import { Tensor } from "@tensorflow/tfjs";
import { prisma } from "~/db.server";
import cuid from "cuid";

export async function createPost(post: Pick<Post, "title" | "content">) {
  return await prisma.post.create({ data: post });
}

export async function createPostWithEmbed(title: string, content: string, tensor: Tensor) {
  const id = cuid();
  const contentString = content.replaceAll("'", "''");
  const array_string = "'[" + tensor.arraySync().toString() + "]'";
  const sql_string_unsafe =
    'INSERT INTO "Post"(id, title, content, vector) VALUES (\'' + id + "', '" + title + "', '" + contentString + "', " + array_string + ");";

  // console.log(sql_string_unsafe);

  return await prisma.$executeRawUnsafe(sql_string_unsafe);
}

export async function loadAllPost() {
  return await prisma.post.findMany();
}

export async function getPostData(id: string) {
  return await prisma.post.findFirstOrThrow({ where: { id: id } });
}

export async function updateEmbedPostData(id: string, tensor: Tensor) {
  const array_string = "'[" + tensor.arraySync().toString() + "]'";
  const sql_string_unsafe = 'UPDATE "Post" SET "vector"=' + array_string + ' WHERE "id"=\'' + id + "'";

  return await prisma.$executeRawUnsafe(sql_string_unsafe);
}

export async function searchEntryPostDataUsingEmbed(tensor: Tensor) {
  const array_string = "'[" + tensor.arraySync().toString() + "]'";
  const sql_string_unsafe = 'SELECT id, title, content FROM "Post" ORDER BY vector <-> ' + array_string + " LIMIT 5";

  // console.log(sql_string_unsafe);

  return await prisma.$queryRawUnsafe(sql_string_unsafe);
}
