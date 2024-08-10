"use server";

import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import { GetQuestionsParams, CreateQuestionParams } from "./shared.types";
import { revalidatePath } from "next/cache";

// to get questions from DB
export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    // retrieves all documents in the Question collection
    const questions = await Question.find({})
      // 'populate' is a Mongoose method that replaces specified fields in the documents with documents from other collections.
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// to create a question document in DB
export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    // destructuring params
    const { title, content, tags, author, path } = params;

    // creating a instance of a question document
    const question = await Question.create({
      title,
      content,
      author,
    });

    // eventually hold the (_id)s of the tags that are either created or found in the database.
    const tagDocuments = [];

    // Loop to create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        // finding a tag in Tag model based on regex
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        // if the tag does not exist, create a new that
        // Whether the tag is found or newly created, $push: { questions: question._id } adds the question._id to the questions array in the tag document.
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        // upsert: true -> tells MongoDB to insert a new document if no document matches the query (find or create).
        // new: true -> ensures that the operation returns the newly created document if it was inserted.
        { upsert: true, new: true }
      );
      // existingTag now holds the tag document that was either found or created.
      // The _id of the existingTag is pushed into the tagDocuments array.
      tagDocuments.push(existingTag._id);
    }

    // inds a document in the Question collection by its _id and then updates it.
    await Question.findByIdAndUpdate(question._id, {
      // $push: This operator adds elements to an array field. (tags)
      // $each: This operator is used with $push to add multiple elements to the array
      $push: { tags: { $each: tagDocuments } },
    });

    // re-validating a specific path
    // this helps to reload the home page when after we adding quetion
    revalidatePath(path);
  } catch (error) {}
}
