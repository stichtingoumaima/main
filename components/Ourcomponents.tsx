import React from 'react'

const Ourcomponents = () => {
    return (
        //Explore the Essential Components Powering Our App!
        <section className="bg-white dark:bg-gray-900 pt-[5rem]">
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Explore the Essential <br /> Components Powering Our App! <span className="underline decoration-blue-500"></span></h1>
            <div className="mt-2">
                    <span className="inline-block w-40 h-1 bg-blue-500 rounded-full" />
                    <span className="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full" />
                    <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full" />
                  </div>
            {/* <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus
            </p> */}
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-3">
                <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">User Authentication</h1>
                <p className="text-gray-500 dark:text-gray-300">
                Ensuring the utmost security and convenience, our User Authentication Component is seamlessly integrated with Firebase Admin. This integration allows for a robust authentication system managed by Firebase, offering features such as secure user registration, login, and authorization. 
                </p>
                <a href="https://firebase.google.com/docs/admin/setup" className="inline-flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  <span className="mx-1">read more</span>
                  <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </a>
              </div>
              <div className="space-y-3">
                <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Subscription Provider</h1>
                <p className="text-gray-500 dark:text-gray-300">
                The Subscription Management Component ensures a hassle-free and flexible approach to user subscriptions. Seamlessly integrated with external payment gateways Stripe, it simplifies secure transactions for PRO membership plans.
                </p>
                <a href="https://stripe.com/docs" className="inline-flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  <span className="mx-1">read more</span>
                  <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </a>
              </div>
              <div className="space-y-3">
                <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Translation Engine</h1>
                <p className="text-gray-500 dark:text-gray-300">
                 The Translation Engine Component empowers our app with advanced language translation services powered by Aritficial Intelligence. In real-time, it translates messages, fostering inclusive communication among users from diverse linguistic backgrounds. 
                </p>
                <a href="https://cloud.google.com/translate/docs" className="inline-flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  <span className="mx-1">read more</span>
                  <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </a>
              </div>
              <div className="space-y-3">
                <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Database Management</h1>
                <p className="text-gray-500 dark:text-gray-300">
                 At the core of our data management strategy, the Data Storage and Retrieval Component leverage Firebase Firestore for reliable and scalable storage. This ensures the efficient handling and synchronization of chat data across various devices.
                </p>
                <a href="https://firebase.google.com/docs/firestore" className="inline-flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  <span className="mx-1">read more</span>
                  <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </a>
              </div>
              <div className="space-y-3">
                <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Security and Compliance</h1>
                <p className="text-gray-500 dark:text-gray-300">
                Ensuring the utmost security and privacy of user data is paramount in our application. By incorporating robust message encryption on the database, our application prioritizes the privacy and security of user communications, aligning with the highest standards of data protection.
                </p>
                <a href="https://cloud.google.com/firestore/docs/server-side-encryption#:~:text=Firestore%20automatically%20encrypts%20all%20data,read%20by%20an%20authorized%20user." className="inline-flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  <span className="mx-1">read more</span>
                  <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </a>
              </div>
              <div className="space-y-3">
                <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Simple &amp; clean designs</h1>
                <p className="text-gray-500 dark:text-gray-300">
                Our design philosophy seamlessly integrates with the power of Next.js and TypeScript, creating a user friendly environment where simplicity meets efficiency.
                </p>
                <a href="#" className="inline-flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  <span className="mx-1">read more</span>
                  <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      );
}

export default Ourcomponents