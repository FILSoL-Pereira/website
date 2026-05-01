-- CreateTable
CREATE TABLE "talks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "speaker_id" UUID NOT NULL,
    "is_open" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "talks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "talk_id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "options" TEXT[],
    "correct_option" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 10,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "question_id" UUID NOT NULL,
    "attendee_id" UUID NOT NULL,
    "selected_option" INTEGER NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "points_earned" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "answers_question_id_attendee_id_key" ON "answers"("question_id", "attendee_id");

-- AddForeignKey
ALTER TABLE "talks" ADD CONSTRAINT "talks_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_talk_id_fkey" FOREIGN KEY ("talk_id") REFERENCES "talks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_attendee_id_fkey" FOREIGN KEY ("attendee_id") REFERENCES "registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
