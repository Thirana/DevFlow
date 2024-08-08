import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";

const questions = [
  {
    _id: "1",
    title: "What is TypeScript?",
    tags: [
      { _id: "1", name: "TypeScript" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      picture: "https://example.com/picture1.jpg",
    },
    upvotes: ["user1", "user2"],
    views: 15000000,
    answers: [
      {
        _id: "1",
        author: "user3",
        text: "TypeScript is a superset of JavaScript.",
        createdAt: new Date("2024-07-01T10:30:00Z"),
      },
    ],
    createdAt: new Date("2024-05-01T10:00:00Z"),
  },
  {
    _id: "2",
    title: "How to use React?",
    tags: [
      { _id: "3", name: "React" },
      { _id: "4", name: "JavaScript" },
    ],
    author: {
      _id: "2",
      name: "Jane Smith",
      picture: "https://example.com/picture2.jpg",
    },
    upvotes: ["user3", "user4"],
    views: 200500,
    answers: [
      {
        _id: "2",
        author: "user5",
        text: "React is a JavaScript library for building user interfaces.",
        createdAt: new Date("2023-02-01T11:30:00Z"),
      },
    ],
    createdAt: new Date("2023-02-01T11:00:00Z"),
  },
  {
    _id: "3",
    title: "What is Docker?",
    tags: [
      { _id: "5", name: "Docker" },
      { _id: "6", name: "DevOps" },
    ],
    author: {
      _id: "3",
      name: "Alice Johnson",
      picture: "https://example.com/picture3.jpg",
    },
    upvotes: ["user6", "user7"],
    views: 300,
    answers: [
      {
        _id: "3",
        author: "user8",
        text: "Docker is a platform for developing, shipping, and running applications.",
        createdAt: new Date("2023-03-01T12:30:00Z"),
      },
    ],
    createdAt: new Date("2023-03-01T12:00:00Z"),
  },
  {
    _id: "4",
    title: "How to set up a CI/CD pipeline?",
    tags: [
      { _id: "7", name: "CI/CD" },
      { _id: "8", name: "DevOps" },
    ],
    author: {
      _id: "4",
      name: "Bob Brown",
      picture: "https://example.com/picture4.jpg",
    },
    upvotes: ["user9", "user10"],
    views: 400,
    answers: [
      {
        _id: "4",
        author: "user11",
        text: "A CI/CD pipeline automates the process of software delivery.",
        createdAt: new Date("2023-04-01T13:30:00Z"),
      },
    ],
    createdAt: new Date("2023-04-01T13:00:00Z"),
  },
];

// This home component is a childe for layout in (root) path
export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for question"
          otherClasses="flex-1"
        />
        {/* until md: breakpoint this will be shown. larger than md: breakpoint, this will be hidden */}
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex "
        />
      </div>
      <HomeFilters />

      {/* question cards / no question  */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no questions to show"
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima praesentium quibusdam recusandae minus, et rem, delectus aliquam laborum voluptatum hic odio nobis, enim molestias?"
            link="/ake-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
