import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Following, uuid } from "@/types/user";
import FollowingItem from "./following-item";

interface FollowingTableProps {
  arr: Following[];
  onUnfollow: (uuid: uuid) => void;
}

export default function FollowingTable({
  arr,
  onUnfollow,
}: FollowingTableProps) {
  return (
    <Table>
      <TableBody>
        {arr.map((account) => (
          <TableRow key={account.followee_id}>
            <TableCell>
              <FollowingItem
                uuid={account.followee_id}
                users={{
                  username: account.users.username,
                  profile_picture_url: account.users.profile_picture_url,
                }}
                onUnfollow={onUnfollow}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
