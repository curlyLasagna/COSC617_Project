import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import FollowingItem from "./following-item";

export default function FollowingTable() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <FollowingItem />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
