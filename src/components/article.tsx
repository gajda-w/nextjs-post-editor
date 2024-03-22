import parse from "html-react-parser";

export const Article = ({ content }: { content: string }) => {
  return (
    <div className="flex flex-col gap-2 max-w-7xl mx-auto">
      {parse(content)}
    </div>
  );
};

Article.displayName = "Article";
