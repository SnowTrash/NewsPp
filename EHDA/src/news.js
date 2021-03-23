const url =
  "https://newsapi.org/v2/top-headlines?country=mx&category=science&apiKey=ce529d1235664a66b34fed42925c2df2";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}
//https://newsapi.org/v2/top-headlines?country=mx&category=science&apiKey=ce529d1235664a66b34fed42925c2df2