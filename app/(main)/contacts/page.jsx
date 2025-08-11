"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { Plus, User, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BarLoader } from "react-spinners";

const ContactsPage = () => {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState();

  const { data, isLoading } = useConvexQuery(api.contacts.getAllContacts);

  if (isLoading) {
    return (
      <div className="py-16">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  const { users, groups } = data || { users: [], groups: [] };

  return (
    <div className="container mx-auto mt-16 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-5xl gradient-title">Contacts</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" />
            People
          </h2>

          {users.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center text-muted-foreground">
                No contacts yet. Add an expense with someone to see them here.
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              {
                users.map((user) => (
                  <Link key={user.id} href={`/person/${user.id}`}>
                    <Card className="hover:bg-muted/30 hover:border-emerald-400 transition-colors cursor-pointer">
                      <CardContent className="py-4 text-center text-muted-foreground">
                        <div className="flex items-center justify-between ">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.imageUrl}/>
                              <AvatarFallback className="bg-muted-foreground">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              }
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Groups
          </h2>

          {users.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center text-muted-foreground">
                No contacts yet. Add an expense with someone to see them here.
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              {
                groups.map((group) => (
                  <Link key={group.id} href={`/group/${group.id}`}>
                    <Card className="hover:bg-muted/30 hover:border-emerald-400 transition-colors cursor-pointer">
                      <CardContent className="py-4 text-center text-muted-foreground">
                        <div className="flex items-center justify-between ">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-md">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          <div>
                              <p className="font-medium">{group.name}</p>
                              <p className="text-sm text-muted-foreground">{group.memberCount} members</p>
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
