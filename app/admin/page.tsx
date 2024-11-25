import { clerkClient } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Admin() {
  let users: User[] = [];
  try {
    const clerk = await clerkClient();
    // Get the paginated response and extract the data array
    const response = await clerk.users.getUserList({
      limit: 100,
      orderBy: '-created_at',
    });
    users = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.emailAddresses[0]?.emailAddress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}