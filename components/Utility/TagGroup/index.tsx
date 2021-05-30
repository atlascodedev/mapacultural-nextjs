import { Tooltip } from "@material-ui/core";
import React from "react";
import Tag, { ITag } from "../Tag";
import TruncateTooltip from "./TruncateTooltip";

export interface ITagGroup {
  tags: string[];
  truncate?: number;
  truncateMobile?: boolean;
  maxCols?: number;
  mobileMaxCols?: number;
}

const TagGroup = ({
  tags,
  maxCols = 3,
  truncate,
  mobileMaxCols = 2,
  truncateMobile = false,
}: ITagGroup) => {
  const [truncated, setTruncated] = React.useState<string[]>([]);
  const [activeTags, setActiveTags] = React.useState<string[]>([]);

  React.useEffect(() => {
    let activeTagsInternal = [...tags];
    let truncatedTagsInternal = [];

    if (truncate && global.window.innerWidth > 768) {
      for (let i = 0; i < truncate; i++) {
        let truncatedItem = activeTagsInternal.pop();

        truncatedTagsInternal.push(truncatedItem);
      }
    } else if (truncate && global.window.innerWidth < 768 && truncateMobile) {
      for (let i = 0; i < truncate; i++) {
        let truncatedItem = activeTagsInternal.pop();

        truncatedTagsInternal.push(truncatedItem);
      }
    }

    setActiveTags(activeTagsInternal);
    setTruncated(truncatedTagsInternal);
  }, []);

  return (
    <div className="flex gap-2">
      <div
        className={`grid grid-cols-${mobileMaxCols.toString()} md:grid-cols-${maxCols.toString()} grid-flow-row gap-y-4 gap-2 place-items-center md:place-items-start `}
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
