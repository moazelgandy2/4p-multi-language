// "use client";
// import Image from "next/image";
// import React, { useEffect } from "react";
// import banner1 from "/public/image/banner-1.jpg";
// import banner2 from "/public/image/banner-2.jpg";
// import banner3 from "/public/image/banner-3.jpg";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Autoplay } from "swiper/modules";
// import Aos from "aos";

// const CoverHeader = () => {
//   useEffect(() => {
//     Aos.init();
//   }, []);
//   return (
//     <section>
//       <Swiper
//         direction={"horizontal"}
//         loop={true}
//         speed={2000}
//         // autoplay={{ delay: 2000 }}
//         allowTouchMove={false}
//         modules={[Autoplay]}
//         className="mySwiper h-full"
//       >
//         <SwiperSlide className="relative text-white">
//           <div className="relative w-full h-[500px]">
//             <Image
//               src={banner1}
//               alt="cover"
//               fill
//               className="object-cover lg:rounded-bl-[350px]"
//               priority
//             />
//             {/* Dark Overlay */}
//             <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 md:rounded-bl-[350px]"></div>
//           </div>
//           <div className="absolute inset-0  flex items-center justify-center">
//             <div className="container flex flex-col justify-center text-center">
//               <h1 className="md:text-title text-[25px] font-bold animate-colorChange animate-pulse">
//                 Explore Alexandria
//               </h1>
//               <p className="md:text-largeTxt sm:text-[16px]">
//                 Lets uncover the best places to eat, drink, and shop nearest to
//                 you.
//               </p>
//             </div>
//           </div>
//         </SwiperSlide>

//         <SwiperSlide className="relative text-white">
//           <div className="relative w-full h-[500px]">
//             <Image
//               src={banner2}
//               alt="cover"
//               fill
//               className="object-cover lg:rounded-bl-[350px]"
//               priority
//             />
//             {/* Dark Overlay */}
//             <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 md:rounded-bl-[350px]"></div>
//           </div>
//           <div className="absolute inset-0  flex items-center justify-center">
//             <div className="container flex flex-col justify-center text-center">
//               <h1 className="md:text-title text-[25px] font-bold animate-colorChange">
//                 Explore Alexandria
//               </h1>
//               <p className="md:text-largeTxt sm:text-[16px] ">
//                 Lets uncover the best places to eat, drink, and shop nearest to
//                 you.
//               </p>
//             </div>
//           </div>
//         </SwiperSlide>
//         <SwiperSlide className="relative text-white">
//           <div className="relative w-full h-[500px]">
//             <Image
//               src={banner3}
//               alt="cover"
//               fill
//               className="object-cover lg:rounded-bl-[350px]"
//               priority
//             />
//             {/* Dark Overlay */}
//             <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 md:rounded-bl-[350px]"></div>
//           </div>
//           <div className="absolute inset-0  flex items-center justify-center">
//             <div className="container flex flex-col justify-center text-center">
//               <h1 className="md:text-title text-[25px] font-bold animate-colorChange">
//                 Explore Alexandria
//               </h1>
//               <p className="md:text-largeTxt sm:text-[16px] ">
//                 Lets uncover the best places to eat, drink, and shop nearest to
//                 you.
//               </p>
//             </div>
//           </div>
//         </SwiperSlide>
//       </Swiper>
//     </section>
//   );
// };

// export default CoverHeader;
