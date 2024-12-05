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

const Profile = () => {
  const Skeleton = () => (
    <div className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100'></div>
  );

  const items = [
    {
      title: "Sign Novice",
      description: "Wow You have succsefully mastered 10 words !",
      header: <img src={book} width={"150px"} />,
    },
    {
      title: "Sign Amateur",
      description: "Wow You have succsefully mastered 50 words !",
      header: <img src={book2} width={"150px"} />,
    },
    {
      title: "Sign Expert",
      description: "Wow You have succsefully mastered 100 words !",
      header: <img src={book4} width={"150px"} />,
    },
    {
      title: "Sign Proffesional",
      description: "Wow You have succsefully mastered 1000 words !",
      header: <img src={book3} width={"150px"} />,
    },
    {
      title: "Active User",
      description: "Wow You have signed in for more than 10 days !",
      header: <img src={checklist} width={"150px"} />,
    },
    {
      title: "Super Active User",
      description: "Wow You have signed in 10 day in a row !",
      header: <img src={calendar} width={"150px"} />,
    },
  ];

  const items2 = [
    {
      title: "Amount of Words",
      description: "200 Words",
    },
    {
      title: "Time Played",
      description: "20 Hours",
    },
    {
      title: "Longest Streak",
      description: "10 Words",
    },
    {
      title: "Master 500 Words",
      description: "Wow You have succsefully mastered 10 words !",
      header: <img src={bar} width='200px' />,
    },
    {
      title: "Current Streak",
      description: "5 Days",
    },
    {
      title: "Active Days",
      description: "52 Days",
    },
  ];

  return (
    <div className=' min-h-screen w-full bg-white   bg-dot-black/[0.2] relative flex flex-col items-center '>
      <Navigation classNames='mt-10' />
      <div className='text-5xl font-bold my-10 mt-20'>Achievements</div>
      <BentoGrid className=''>
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
      <div className='text-5xl font-bold my-10'>Statistics</div>
      <BentoGrid className={"grid md:auto-rows-[8rem] mb-20"}>
        {items2.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={`${
              i === 3 || i === 6
                ? "md:row-span-2 md:col-span-2"
                : "md:row-span-1"
            }`}
          />
        ))}
      </BentoGrid>

      {/* <CardContainer className='inter-var'>
        <CardBody className='bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  '>
          <CardItem
            translateZ='50'
            className='text-xl font-bold text-neutral-600 dark:text-white'
          >
            See Your
          </CardItem>
          <CardItem
            as='p'
            translateZ='60'
            className='text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300'
          >
            Hover over this card to unleash the power of CSS perspective
          </CardItem>
          <CardItem translateZ='100' className='w-full mt-4'>
            <img
              src='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              height='1000'
              width='1000'
              className='h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl'
              alt='thumbnail'
            />
          </CardItem>
          <div className='flex justify-between items-center mt-20'>
            <CardItem
              translateZ={20}
              href='https://twitter.com/mannupaaji'
              target='__blank'
              className='px-4 py-2 rounded-xl text-xs font-normal dark:text-white'
            >
              Try now →
            </CardItem>
            <CardItem
              translateZ={20}
              as='button'
              className='px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold'
            >
              Sign up
            </CardItem>
          </div>
        </CardBody>
      </CardContainer> */}
    </div>
  );
};

export default Profile;
