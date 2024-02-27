

import * as React from 'react'
import imageone from '../images/customchatimage/one.png'
import imagetwo from '../images/customchatimage/two.png'
import imagethree from '../images/customchatimage/three.jpg'
import Blob from '@/components/Blob'
import Image from 'next/image';
import phones from '../images/customchatimage/phones2.png'


// new carousel

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const Problemwesolve = () => {
  const carouselData = [
    {
      image: "../images/customchatimage/phones.png",
      text: "Breaking Barriers Bridging Worlds",
      para: "There are over 7,000 languages spoken today but despite the diversity of languages, communication barriers continue to limit our ability to connect and understand each other.This is especially true in a globalized world where people are constantly travelling and connecting with others from different parts of the world.In fact, language barriers are often cited as a major hindrance to international trade and diplomacy.Problems like this gave birth to GLOCAL - A translation and also a chat app.Glocal is a translation app that helps you translate your native language into any other language in the world with relative ease.It also helps to communicate with anyone, anywhere in the world with a different language."
    },
    {
      image: "https://img.freepik.com/free-vector/cartoon-tiny-people-having-international-communication-online-flat-illustration_74855-16818.jpg?w=996&t=st=1707249834~exp=1707250434~hmac=dfb25815908820986448ab0396cc7dfe5fad265ec2523f06851be8a81f378817",
      text: "Instant Two Way Translation Unleashed",
      para: "In a world where global communication is essential, our app tackles a significant challenge — the language barrier. Moving to a new place or country can be daunting, especially when faced with unfamiliar local languages. Our app provides a transformative solution with its real-time translation feature, enabling seamless communication. The unique aspect of our app lies in its two-way translation — ensuring that whatever is said in one language is instantly translated back to the user's preferred language. This ensures not only smooth and effortless communication but also fosters a deeper understanding among users from diverse linguistic backgrounds.As the dynamics of the global landscape continue to evolve, our app stands as a bridge, connecting individuals and fostering meaningful interactions without the hindrance of language barriers."
    },
    {
      image: "https://img.freepik.com/free-photo/digital-cloud-data-storage-digital-concept-cloudscape-digital-online-service-global-network-database-backup-computer-infrastructure-technology-solution_90220-1046.jpg?w=996&t=st=1707373451~exp=1707374051~hmac=6217efb971330bcdc6353487657d4938a578c315356df5bddd3d2cda25c2e245",
      text: "Seamlessly Resumed Securely Stored",
      para: "In our SaaS chat app, we introduce a distinctive feature that goes beyond real-time translation, offering users the capability to store and resume their translated conversations. This unique functionality leverages Firebase Firestore to securely save chats, allowing users to access their conversation history across different sessions. The goal is to enhance user convenience and provide a seamless communication experience over time. All translated chats are securely stored in Firebase Firestore, associated with individual user accounts. This enables users to conveniently access their conversation history whenever they log in, facilitating a continuous and uninterrupted chat experience."
    },
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Global Collaboration with Private Rooms",
      para: "Users can effortlessly create virtual spaces to engage in conversations with multiple people worldwide simultaneously. This feature enhances social interactions and facilitates collaboration for various purposes, such as business meetings, virtual events, or casual group discussions.The user-friendly interface allows easy creation, joining, and management of private rooms. Integrated real-time translation ensures smooth communication, breaking down language barriers and fostering connections in a global environment. The user-friendly interface allows easy creation, joining, and management of private rooms. Integrated real-time translation ensures smooth communication, breaking down language barriers and fostering connections in a global environment."
    },
    {
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "User-Friendly & Responsive Design",
      para: "The user-friendly and responsive design enhances the overall experience. The intuitive interface, responsive design, and effortless navigation cater to users across various devices. Accessible language switching, real-time updates, and interactive learning elements make the app suitable for users of diverse backgrounds and preferences.Moreover, the customization options allow users to tailor their profiles, ensuring a personalized experience based on language preferences. The seamless subscription management interface, integrated with Stripe, simplifies plan upgrades and management."
    },
  ];


  // return (
  //   <div className="flex items-center justify-center">
      
  //     <Carousel className="w-full max-w-screen-xl">
  //     <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white ml-[-35px]">Solutions Provided by Our App</h1>
  //     <div className="mt-2">
  //     <span className="inline-block w-40 h-1 bg-blue-500 rounded-full  ml-[-35px]" />
  //     <span className="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full" />
  //     <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full" />
  //     </div>
      
  //       <CarouselContent className="w-full">
  //         {carouselData.map((item, index) => (
  //           <CarouselItem key={index}>
  //             <div className="p-8 flex items-center justify-center space-x-8">
  //             {index === 0 ? (
  //                 <Image
  //                   src={phones.src}
  //                   alt={`Image ${index + 1}`}
  //                   width={500}
  //                   height={500}
  //                   className="rounded-md"
  //                 />
  //               ) : (
  //                 <Image
  //                   src={item.image}
  //                   alt={`Image ${index + 1}`}
  //                   width={500}
  //                   height={500}
  //                   className="rounded-md"
  //                 />
  //               )}
  //               <div className="flex flex-col items-start ml-8 w-3/5">
  //               <h1 className="text-2xl font-semibold capitalize lg:text-3xl mt-[-10px] dark:text-white">
  //               <span className="dark:text-gray-350">{item.text.split(' ').slice(0, 2).join(' ')}</span>{' '}
  //               <span className="text-blue-500">{item.text.split(' ').slice(2).join(' ')}</span>
  //             </h1>
  //                   <br />
  //                   <p className={`text-base text-gray-600 dark:text-gray-300 text-md ${index === 0 ? 'text-blue-500' : ''}`}>
  //                   {index === 0 ? (
  //                     <span>
  //                       There are over 7,000 languages spoken today but despite the diversity of languages, communication barriers continue to limit our ability to connect and understand each other.This is especially true in a globalized world where people are constantly travelling and connecting with others from different parts of the world.In fact, language barriers are often cited as a major hindrance to international trade and diplomacy. <br/> <br/><span className='text-blue-500 font-bold'>Problems like this gave birth to GLOCAL - A translation and also a chat app.</span><br/> <br/>Glocal is a translation app that helps you translate your native language into any other language in the world with relative ease.It also helps to communicate with anyone, anywhere in the world with a different language.
  //                     </span>
  //                   ) : (
  //                     item.para
  //                   )}
  //                 </p>
  //               </div>
  //             </div>
  //           </CarouselItem>
  //         ))}
  //       </CarouselContent>
  //       <CarouselPrevious className='text-blue-500 dark:text-gray-200'/>
  //       <CarouselNext className='text-blue-500 dark:text-gray-200'/>
  //     </Carousel>
  //   </div>
  // );


  return(
    <div className='container px-8 py-10 mx-auto'>
      <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Solutions Provided By Our App</h1>
       <div className="mt-2">
         <span className="inline-block w-40 h-1 bg-blue-500 rounded-full" />
         <span className="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full" />
         <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full" />
       </div>

       <iframe src="https://65c9ca55637dc6aeeba52769--lucent-wisp-18850f.netlify.app/" width="100%" height="650px"></iframe>

       
    </div>

 )
}

export default Problemwesolve








// working

// return(
//   <div className='container px-6 py-10 mx-auto'>
//     <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Solutions Provided By Our App</h1>
//      <div className="mt-2">
//        <span className="inline-block w-40 h-1 bg-blue-500 rounded-full" />
//        <span className="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full" />
//        <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full" />
//      </div>

//      <Carousel className="w-full max-w-screen-xl">
//      <CarouselContent className="w-full">
//    {carouselData.map((item, index) => (
//      <CarouselItem key={index}>
//        <div className="p-8 flex flex-col items-center space-y-8 sm:flex-row sm:items-center sm:space-x-8 sm:space-y-0">
//          {index === 0 ? (
//            <Image
//              src={phones.src}
//              alt={`Image ${index + 1}`}
//              width={400}
//              height={400}
//              className="rounded-md sm:w-1/2"
//            />
//          ) : (
//            <Image
//              src={item.image}
//              alt={`Image ${index + 1}`}
//              width={500}
//              height={500}
//              className="rounded-xl sm:w-1/2"
//            />
//          )}
//          <div className="flex flex-col items-start w-full">
//            <h1 className="text-2xl font-semibold capitalize lg:text-3xl mt-[-10px] dark:text-white">
//              <span className="dark:text-gray-350">{item.text.split(' ').slice(0, 2).join(' ')}</span>{' '}
//              <span className="text-blue-500">{item.text.split(' ').slice(2).join(' ')}</span>
//            </h1>
//            <br />
//            <p className={`text-base text-gray-600 dark:text-gray-300 text-md ${index === 0 ? 'text-blue-500' : ''}`}>
//              {index === 0 ? (
//                <span className='text-gray-500 dark:text-gray-300'>
//                  {/* Your content */}
//                  There are over 7,000 languages spoken today but despite the diversity of languages, communication barriers continue to limit our ability to connect and understand each other.This is especially true in a globalized world where people are constantly travelling and connecting with others from different parts of the world.In fact, language barriers are often cited as a major hindrance to international trade and diplomacy. <br/> <br/><span className='text-blue-500 font-bold'>Problems like this gave birth to GLOCAL - A translation and also a chat app.</span><br/> <br/>Glocal is a translation app that helps you translate your native language into any other language in the world with relative ease.It also helps to communicate with anyone, anywhere in the world with a different language. When you receive a message in any language, it automatically translates to your chosen language. Similarly, when you send a message in any language to another person, it is converted to their preferred language. This two-way translation not only ensures seamless conversation but also eliminates the need for a common medium language.
//                </span>
//              ) : (
//                item.para
//              )}
//            </p>
//          </div>
//        </div>
//      </CarouselItem>
//    ))}
//  </CarouselContent>
//  <CarouselPrevious className='text-blue-500 dark:text-gray-200'/>
//  <CarouselNext className='text-blue-500 dark:text-gray-200'/>
//      </Carousel>
//   </div>

// )
// }

// export default Problemwesolve