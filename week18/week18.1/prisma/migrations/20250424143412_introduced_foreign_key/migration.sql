-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT NOW();

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
