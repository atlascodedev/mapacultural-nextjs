import { Tooltip } from "@material-ui/core";
import React from "react";
import Tag, { ITag } from "../Tag";
import TruncateTooltip from "./TruncateTooltip";

export interface ITagGroup {
  tags: string[];
  truncate?: number;
  maxCols?: number;
}

const TagGroup = ({ tags, maxCols = 3, truncate }: ITagGroup) => {
  const [truncated, setTruncated] = React.useState<string[]>([]);
  const [activeTags, setActiveTags] = React.useState<string[]>([]);

  React.useEffect(() => {
    let activeTagsInternal = [...tags];
    let truncatedTagsInternal = [];

    for (let i = 0; i < truncate; i++) {
      let truncatedItem = activeTagsInternal.pop();

      truncatedTagsInternal.push(truncatedItem);
    }

    setActiveTags(activeTagsInternal);
    setTruncated(truncatedTagsInternal);
  }, []);

  return (
    <div className="flex gap-2">
      <div
        className={`grid md:grid-cols-${maxCols.toString()} grid-flow-row gap-y-4 gap-x-1`}
      >
        {activeTags.map((tag, index) => {
          return <Tag title={tag} key={index} />;
        })}

        {truncated.length > 0 ? (
          <div className="md:justify-self-center">
            <TruncateTooltip truncated={truncated} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TagGroup;
