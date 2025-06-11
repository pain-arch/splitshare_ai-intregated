import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({

    users: defineTable({
        name: v.string(),
        email: v.string(),
        tokenIdentifier: v.string(),
        imageUrl: v.optional(v.string()),
    })
        .index("by_token", ["tokenIdentifier"])
        .index("by_email", ["email"])
        .searchIndex("search_name", { searchField: "name" })
        .searchIndex("search_email", { searchField: "email" }),

    expenses: defineTable({
        description: v.string(),
        amount: v.number(), // e.g., 100.50 for $100.50
        category: v.optional(v.string()), // e.g., "food", "transport", "utilities"
        date: v.number(),
        paidByUserId: v.id("users"),
        splitType: v.string(), 
        splits: v.array(
            v.object({
                userId: v.id("users"),
                amount: v.number(),
                paid: v.boolean(),
            })
        ),  
        groupId: v.optional(v.id("groups")), // reference to the group if applicable
        createdBy: v.id("users"),
    })
    .index("by_group", ["groupId"])
    .index("by_user_and_group", ["paidByUserId", "groupId"])
    .index("by_date", ["date"]),

    groups: defineTable({
        name: v.string(), 
        description: v.optional(v.string()),
        createdBy: v.id("users"),
        members: v.array(
            v.object({
                userId: v.id("users"), // reference to the user
                role: v.string(),// e.g., "admin", "member"
                joinedAt: v.number(),
            })
        ),
    }),

    settlements: defineTable({
        amount: v.number(),
        note: v.optional(v.string()),
        date: v.number(),
        paidByUserId: v.id("users"), // user who made the payment
        receivedByuserId: v.id("users"), // user who received the payment
        groupId: v.optional(v.id("groups")),
        relatedExpenseId: v.optional(v.array(v.id("expenses"))),
        createdBy: v.id("users"),
    })
        .index("by_group", ["groupId"])
        .index("by_user_and_group", ["paidByUserId", "groupId"])
        .index("by_receiver_and_group", ["receivedByuserId", "groupId"])
        .index("by_date", ["date"]),


})