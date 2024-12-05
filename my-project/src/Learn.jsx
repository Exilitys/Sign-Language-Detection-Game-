import React from "react";
import Navigation from "./component/Navigation";
import { BentoGrid, BentoGridItem } from "./component/bento-grid";
import { CardBody, CardContainer, CardItem } from "./component/3d-card";
import bar from "./assets/bar.png";
import book from "./assets/book.png";
import book2 from "./assets/books.png";
import book3 from "./assets/book-stack.png";
import book4 from "./assets/books2.png";
import checklist from "./assets/checklist.png";
import calendar from "./assets/calendar.png";

const Learn = () => {
  const Skeleton = () => (
    <div className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100'></div>
  );

  const items = [
    {
      title: "Learn Alphabet",
      description: "Learn the basic sign language alphabet",
      header: <img src={book} width={"150px"} />,
    },
    {
      title: "Learn English Novice",
      description: "Learn basic sign language english words",
      header: <img src={book2} width={"150px"} />,
    },
    {
      title: "Learn English Intermediate",
      description: "Learn Intermediate sign language english words",
      header: <img src={book2} width={"150px"} />,
    },
    {
      title: "Learn English Advanced",
      description: "Learn Advanced sign language english words",
      header: <img src={book2} width={"150px"} />,
    },
    {
      title: "Learn Javanese",
      description: "Learn javanese sign language words",
      header: <img src={book4} width={"150px"} />,
    },
    {
      title: "Learn Sentence",
      description:
        "Learn to combine the sign language words you learned into a sentence",
      header: <img src={book3} width={"150px"} />,
    },
  ];

  return (
    <div className=' min-h-screen w-full bg-white   bg-dot-black/[0.2] relative flex flex-col items-center '>
      <Navigation classNames='mt-10' />
      <div className='text-5xl font-bold my-10 mt-20'>Learn</div>
      <BentoGrid className='md:grid-cols-3 gap-20'>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={"text-center items-center"}
          />
        ))}
      </BentoGrid>

      <div className='text-xl font-bold my-10 hover:opacity-50 cursor-pointer'>
        View All -{">"}
      </div>
    </div>
  );
};

export default Learn;
