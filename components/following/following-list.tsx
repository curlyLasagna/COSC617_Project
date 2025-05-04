import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Following } from "@/types/user";
import FollowingItem from "./following-item";

interface FollowingTableProps {
  arr: Following[];
}

export default function FollowingTable({ arr }: FollowingTableProps) {
  return (
    <Table>
      <TableBody>
        {arr.map((account) => (
          <TableRow key={account.followee_id}>
            <TableCell>
              <FollowingItem
                username={account.username}
                uuid={account.followee_id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
