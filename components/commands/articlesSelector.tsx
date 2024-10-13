import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IArticle } from "../../types/db";
import { categoryNames } from "../../utils/db-enum";
import { ArticleCard } from "./articleCard";

function mapArticlesToCategories(articles: IArticle[]) {
  const result = new Map<string, IArticle[]>();
  const categories: string[] = [
    ...new Set(articles.map((article) => article.category)),
  ];

  if (articles.some((article) => article.favorite)) {
    result.set(
      "Favoris",
      articles.filter((article) => article.favorite)
    );
    articles = articles.filter((article) => !article.favorite);
  }
  categories.forEach((categorie) => {
    result.set(
      categoryNames[categorie],
      articles.filter((article) => article.category === categorie)
    );
  });
  return result;
}

type CommandListState = [Map<string, number>,Dispatch<SetStateAction<Map<string, number>>>];

const containerStyle = {
  maxHeight: "20vh",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    outline: "1px solid slategrey",
  },
  listStyle: "none"
};

export const ArticlesSelector = ({ articles, commandListState }: {articles: IArticle[] | null, commandListState: CommandListState }) => {
  if (!articles) return <p>Chargement...</p>;
  let articleDict = mapArticlesToCategories(articles);
  return (
    <>
      <div style={containerStyle} className="overflow-auto px-4 rounded-lg border-2">
        {Array.from(articleDict.keys()).map((category) => (
          <div key={category} className="my-4">
            <h1 className="text-xl text-black opacity-30 font-bold">
              {category} ({articleDict.get(category)?.length})
            </h1>
            <div className="flex-1 w-full h-full flex flex-wrap relative gap-2">
              {articleDict.get(category)?.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  inputArticleQuantity={commandListState[0].get(String(article.id))||0}
                  setInputArticleQuantity={(qty:number)=>{commandListState[1](new Map(commandListState[0]).set(String(article.name),qty))}}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
