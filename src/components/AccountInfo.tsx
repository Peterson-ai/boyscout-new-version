import { User } from "@supabase/supabase-js";

type AccountInfoProps = {
  user: User;
};

export const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div className="p-6 border rounded-lg bg-card">
      <h2 className="text-xl font-semibold mb-4">Account Information</h2>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Email: {user.email}
        </p>
        <p className="text-sm text-muted-foreground">
          Account created: {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};