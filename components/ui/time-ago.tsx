import { formatDistanceToNow } from "date-fns";

interface TimeAgoProps {
  date: Date;
}

export const TimeAgo = ({ date }: TimeAgoProps) => {
  return (
    <p className="text-sm text-muted-foreground">
      {formatDistanceToNow(date)} ago
    </p>
  );
};