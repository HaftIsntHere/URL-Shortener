-- CreateTable
CREATE TABLE "url" (
    "URL" TEXT NOT NULL,
    "shortenTo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "url_URL_key" ON "url"("URL");
