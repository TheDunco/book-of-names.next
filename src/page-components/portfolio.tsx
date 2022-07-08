import { range, useLocalStorage, useToggle } from '@mantine/hooks';
import cn from 'classnames';
import { Carousel, Tooltip } from 'flowbite-react';
import { useState } from 'react';
import { CaretDown, Palette } from 'tabler-icons-react';

import { ThemeButton } from '@/components/Buttons/ThemeSelectButton';
import {
  CTimelineBody,
  CTimelineEntry,
  CTimelineHeader,
  CTimelineTime,
  CustomTimeline,
} from '@/components/CustomTimeline/CustomTimeline';
import { stringConstants } from '@/lib/stringConstants';
import { ThemesEnum } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const flexSyles = 'flex flex-1 grow flex-col justify-start';
const textStyles = 'text-color-text';
const localStorageThemeEntry = 'color-scheme';
const defaultTheme = ThemesEnum.CLASSY;
const liCycleStyles1 =
  'mt-5 py-2 text-xl w-[fit-content] bg-color-special rounded-lg px-2 ease-in-out transform-gpu duration-200';
const liCycleStyles2 =
  'text-xl w-[fit-content] bg-color-special rounded-lg px-2 ease-in-out transform-gpu duration-200 translate-y-1 opacity-0 h-0';
const liCycleInterval = 2000;
interface ParenProps {
  text: string;
  className?: string;
}

const Parenthetical: React.FC<ParenProps> = ({ text, className }) => {
  return (
    <>
      {' '}
      <span
        className={cn('text-sm font-light text-color-secondary', className)}
      >
        ({text})
      </span>
    </>
  );
};

enum LiCycles {
  CODING,
  KEYBOARDS,
  HEADPHONES,
  MUSIC,
  DND,
  ANIME,
  DRONES,
  MINECRAFT,
  RL,
  SSBU,
}

const LiCyclesToText: Record<number, string> = {
  0: '👨🏼‍💻 Coding',
  1: '⌨️ Keyboards',
  2: '🎧 Headphones',
  3: '🎵 Music',
  4: '🐲 Dungeons and Dragons',
  5: '🇯🇵 Anime',
  6: '🚁 Drones',
  7: '🧱 Minecraft',
  8: '⚽️ Rocket League',
  9: '💥 Super Smash Bros (Ultimate)',
};

export const Portfolio: React.FC = () => {
  const [theme, setTheme] = useLocalStorage({
    key: localStorageThemeEntry,
    defaultValue: defaultTheme,
  });
  const [fontStyles, setFontStyles] = useState('font-theme-font');
  const [liCycle, setLiCycle] = useState(LiCycles.CODING);
  setTimeout(() => {
    if (liCycle + 1 >= LiCycles.SSBU) {
      setLiCycle(LiCycles.CODING);
    } else {
      setLiCycle(liCycle + 1);
    }
  }, liCycleInterval);

  const [themeExpandedToggle, toggleTheme] = useToggle(false, [true, false]);

  return (
    <>
      <div
        data-theme={theme}
        className={cn(
          flexSyles,
          textStyles,
          fontStyles,
          'scroll-smooth bg-color-bg align-middle md:text-lg lg:text-2xl transition-transform ease-in-out duration-200'
        )}
      >
        <header>
          <div className="flex flex-col justify-end bg-color-primary py-5">
            <button
              className="flex flex-row justify-end"
              onClick={() => {
                toggleTheme();
              }}
            >
              <span className="pt-1 pr-1 opacity-70">
                <Tooltip content="Coolers color generator">
                  <a
                    href="https://coolors.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Palette size={20} strokeWidth={2} color={'white'} />
                  </a>
                </Tooltip>
              </span>
              <span className="text-color-bg">Site Theme</span>
              <span
                className={cn(
                  'ease-in-out transform-gpu duration-200 transition-all',
                  themeExpandedToggle
                    ? 'rotate-180 mt-1 lg:mt-2'
                    : 'mb-1 lg:mt-2'
                )}
              >
                <CaretDown />
              </span>
            </button>
            <div aria-label="theme-accordion" id="theme-accordion">
              <div
                className={cn(
                  'flex justify-evenly flex-col my-36 mx-2 md:my-0 md:flex-row py-1 gap-5 ease-in-out transform-gpu duration-300 transition-all',
                  themeExpandedToggle
                    ? 'block h-14'
                    : ' -translate-y-72 md:-translate-y-20 h-0 opacity-0 my-0'
                )}
              >
                <ThemeButton
                  themeSet={setTheme}
                  theme={ThemesEnum.CLASSY}
                  fontSet={setFontStyles}
                  font="font-roboto-slab"
                />
                <ThemeButton
                  themeSet={setTheme}
                  theme={ThemesEnum.CHERRY}
                  fontSet={setFontStyles}
                  font="font-monsterrat"
                />
                <ThemeButton
                  themeSet={setTheme}
                  theme={ThemesEnum.PACIFIC}
                  fontSet={setFontStyles}
                  font="font-open"
                />
                <ThemeButton
                  themeSet={setTheme}
                  theme={ThemesEnum.PULSE}
                  fontSet={setFontStyles}
                  font="font-inter"
                />
                <ThemeButton
                  themeSet={setTheme}
                  theme={ThemesEnum.PASTEL}
                  fontSet={setFontStyles}
                  font="font-fira"
                />
                <ThemeButton
                  themeSet={setTheme}
                  theme={ThemesEnum.DOLCH}
                  fontSet={setFontStyles}
                  font="font-open"
                />
              </div>
            </div>
          </div>
        </header>
        <span className="mx-10 mt-10 flex flex-row text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          <div className="animate-wave">👋 </div>
          <div className="mr-3"> </div>
          <div>{stringConstants.intro}</div>
        </span>
        <div className="ml-10 text-2xl">
          I&apos;m a Christian software developer who enjoys...
          <div className="">
            {range(0, 12).map((i) => (
              <div
                key={i}
                className={cn(
                  'text-xl lg:text-2xl xl:text-3xl',
                  liCycle === i ? liCycleStyles1 : liCycleStyles2
                )}
              >
                {LiCyclesToText[liCycle]}
              </div>
            ))}
          </div>
        </div>
        <p className="ml-10">
          My technical and other skills come from both a computer science degree
          and years of real world software development experience. I also fancy
          a custom project like this one occasionally.
        </p>
        <CustomTimeline className="md:text-lg lg:text-2xl">
          <CTimelineEntry>
            <CTimelineHeader>🎓 South Christian High School</CTimelineHeader>
            <CTimelineTime>
              <span>2014-2018</span>
              <div className="-mb-1 mt-1 font-light opacity-70">3.95 GPA</div>
            </CTimelineTime>
            <CTimelineBody>
              Took many shop classes, engineering classes, and had my first
              exposure to Python. Played in band for 4 years.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48px"
                height="48px"
              >
                <path
                  fill="#0277BD"
                  d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"
                />
                <path
                  fill="#FFC107"
                  d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"
                />
              </svg>
            </CTimelineBody>
          </CTimelineEntry>
          <CTimelineEntry>
            <CTimelineHeader>🚐 Midway RV Center </CTimelineHeader>
            <CTimelineTime>
              <span>2016-2020</span>
              <div className="-mb-1 mt-1 font-light opacity-70">Detailer</div>
            </CTimelineTime>
            <CTimelineBody>
              No code here, but I learned the art of detailing, how to work with
              a variety of diverse coworkers, and other essential life skills. I
              cleaned hundreds of RVs inside and out, new and old.
            </CTimelineBody>
          </CTimelineEntry>
          <CTimelineEntry>
            <CTimelineHeader>🎓 Calvin University</CTimelineHeader>
            <CTimelineTime>
              <span>2018-2022</span>
              <div className="-mb-1 mt-1 font-light opacity-70">
                Magna Cum Laude
              </div>
            </CTimelineTime>
            <CTimelineBody>
              College is where I mainly learned to code, how to play D&D, and I
              made many new friends along the way, including my fiance!
              <div className="h-64 lg:w-2/3">
                <Carousel slide={false}>
                  <div className="flex h-full flex-col items-start justify-start bg-color-bg text-color-text">
                    <div className="ml-10 mt-5">
                      <div className="text-lg font-semibold lg:text-2xl">
                        Freshman Year
                      </div>
                      <ol className="ml-10 list-disc">
                        <li>
                          Intro To Computing + Lab
                          <Parenthetical text={'Python'} />
                        </li>
                        <li>
                          Intro To Data Structures + Lab
                          <Parenthetical text={'C++'} />
                        </li>
                        <li>
                          Helped start the Calvin Mars Rover Design Team as the
                          Programming Team Lead.
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="flex h-full flex-col items-start justify-start bg-color-bg text-color-text">
                    <div className="ml-10 mt-5">
                      <div className="text-lg font-semibold">
                        Sophomore Year
                      </div>
                      <ol className="m-0 ml-10 mb-0 list-disc">
                        <li>Intro Computing Seminar</li>
                        <li>
                          Intro To Computer Architecture + Lab
                          <Parenthetical text={'C, Assembly'} />
                        </li>
                        <li>
                          Data Structures & Algorithms
                          <Parenthetical text={'C#'} />
                        </li>
                        <li>
                          Programming Language Concepts + Lab
                          <Parenthetical text={'Java, Ruby, Clojure, Ada'} />
                        </li>
                        <li>Continued as co-lead of CMRDT programming team.</li>
                      </ol>
                    </div>
                  </div>
                  <div className="flex h-full flex-col items-start justify-start bg-color-bg text-color-text">
                    <div className="ml-10 mt-5">
                      <div className="text-lg font-semibold">Junior Year</div>
                      <ol className="m-0 ml-10 mb-0 list-disc">
                        <li>
                          Web Development! Final Project:{' '}
                          <a
                            href="https://github.com/TheDunco/character-sheet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-light"
                          >
                            5e Character Sheet
                          </a>
                          <Parenthetical text={'Angular'} />
                        </li>
                        <li>Computing Seminar</li>
                        <li>
                          Software Engineering + Lab
                          <Parenthetical text={'React Native'} />
                        </li>
                        <li>
                          Operating Systems & Networking
                          <Parenthetical text={'C, Java'} />
                        </li>
                        <li>
                          Embedded Systems and the IoT
                          <Parenthetical text={'Python, Arduino'} />
                        </li>
                        <li>
                          Statistics
                          <Parenthetical text={'R'} />
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="flex h-full flex-col items-start justify-start bg-color-bg text-color-text">
                    <div className="ml-10 mt-5">
                      <div className="text-lg font-semibold">Senior Year</div>
                      <ol className="m-0 ml-10 mb-0 list-disc">
                        <li>Computing Seminar</li>
                        <li>Advanced Computer Networks</li>
                        <li>
                          High Performance Computing
                          <Parenthetical text={'C'} />
                        </li>
                        <li>
                          Senior Project in Computing:{' '}
                          <a
                            href="https://github.com/Inertia-Printers/InertiaPrintersWebsite"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-light"
                          >
                            Inertia Printers Project Website
                          </a>
                          <Parenthetical text={'Angular'} />
                        </li>
                        <li>Computer Security</li>
                        <li>
                          Artificial Intelligence
                          <Parenthetical text={'Audit'} />
                        </li>
                      </ol>
                    </div>
                  </div>
                </Carousel>
              </div>
            </CTimelineBody>
          </CTimelineEntry>
          <CTimelineEntry>
            <CTimelineHeader>
              <span className="mr-2 text-lg">💾</span> Watershed Technologies
              LLC
            </CTimelineHeader>
            <CTimelineTime>
              2020-2022
              <div className="-mb-1 mt-1 font-light opacity-70">
                Embedded Systems Software Developer
              </div>
            </CTimelineTime>
            <CTimelineBody>
              <ol className="list-disc">
                Worked under an Embedded Systems Engineering contractor (my
                soon-to-be father in law) to build embedded systems for a
                variety of real world customers.
                <li className="ml-10">
                  Developed many front-end C# applications for desktop and
                  mobile using Windows and Xamarin Forms respectively.
                  Interfaced with custom hardware running C++ using a custom
                  communication protocol.
                </li>
                <li className="ml-10">
                  These applications included many methods of user interaction
                  and data-visualization.
                </li>
                <li className="ml-10">
                  Worked on a summer project to build an FPV (First Person View)
                  RC airplane capable of autonomous flight via Ardupilot and a
                  Pixhawk 4 flight controller.
                </li>
              </ol>
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="48px"
                  height="48px"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  aria-label="C#"
                >
                  <path
                    fill="#37474f"
                    fillRule="evenodd"
                    d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0 c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867 c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0 c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867 c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="#546e7a"
                    fillRule="evenodd"
                    d="M5.304,34.404C5.038,34.048,5,33.71,5,33.255 c0-3.744,0-15.014,0-18.759c0-0.758,0.417-1.458,1.094-1.836c3.343-1.872,13.405-7.507,16.748-9.38 c0.677-0.379,1.594-0.371,2.271,0.008c3.343,1.872,13.371,7.459,16.714,9.331c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M24,10c7.727,0,14,6.273,14,14s-6.273,14-14,14 s-14-6.273-14-14S16.273,10,24,10z M24,17c3.863,0,7,3.136,7,7c0,3.863-3.137,7-7,7s-7-3.137-7-7C17,20.136,20.136,17,24,17z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="#455a64"
                    fillRule="evenodd"
                    d="M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784 c0,3.795-0.032,14.589,0.009,18.384c0.004,0.396-0.127,0.813-0.323,1.127L23.593,24L42.485,13.205z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M34 20H35V28H34zM37 20H38V28H37z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M32 25H40V26H32zM32 22H40V23H32z"
                    clipRule="evenodd"
                  />
                </svg>

                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="48px"
                  height="48px"
                  aria-label="Xamarin"
                >
                  <path d="M 46.558594 23.253906 L 37.25 6.738281 C 36.660156 5.683594 35.488281 5 34.300781 5 L 15.699219 5 C 14.511719 5 13.339844 5.683594 12.75 6.738281 L 3.441406 23.253906 C 2.851563 24.316406 2.851563 25.683594 3.441406 26.746094 L 12.75 43.261719 C 13.339844 44.316406 14.511719 45 15.699219 45 L 34.300781 45 C 35.488281 45 36.660156 44.3125 37.25 43.261719 L 46.558594 26.746094 C 47.148438 25.683594 47.148438 24.316406 46.558594 23.253906 Z M 33.613281 35 L 30.5625 35 C 30.417969 35 30.277344 34.910156 30.210938 34.78125 L 25.046875 25.199219 C 25.019531 25.148438 24.980469 25.148438 24.953125 25.199219 L 19.773438 34.78125 C 19.714844 34.910156 19.582031 34.988281 19.441406 35 L 16.390625 35 C 16.113281 35 15.902344 34.632813 16.046875 34.378906 L 21.09375 25 L 16.046875 15.601563 C 15.921875 15.375 16.074219 15.050781 16.3125 15 L 19.4375 15 C 19.570313 15 19.703125 15.089844 19.773438 15.207031 L 24.953125 24.792969 C 24.980469 24.84375 25.019531 24.84375 25.046875 24.792969 L 30.207031 15.207031 C 30.285156 15.078125 30.417969 15 30.5625 15 L 33.613281 15 C 33.878906 15 34.078125 15.355469 33.953125 15.601563 L 28.90625 25 L 33.953125 34.378906 C 34.097656 34.632813 33.886719 35 33.613281 35 Z" />
                </svg>
              </div>
            </CTimelineBody>
          </CTimelineEntry>
          <CTimelineEntry>
            <CTimelineHeader>🛠 Tekton Inc </CTimelineHeader>
            <CTimelineTime>
              2022-Present
              <div className="-mb-1 mt-1 font-light opacity-70">
                Software Developer
                <Parenthetical className="text-base" text={'Ecommerce'} />
              </div>
            </CTimelineTime>
            <CTimelineBody>
              Full stack Ecommerce software developer utilizing a modern tech
              stack to build and maintain a production website for a local
              business, delivering thousands of hand tools to a loyal base of
              customers.
            </CTimelineBody>
          </CTimelineEntry>
        </CustomTimeline>
        <div>
          <h2 className="ml-5 text-2xl font-semibold text-color-primary lg:text-3xl">
            My favorite web technologies
          </h2>
          <span className="m-5 flex flex-row flex-wrap justify-between rounded-lg bg-color-special p-5">
            <div>
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="144px"
                height="144px"
                aria-label="Angular"
              >
                <path d="M 24.929688 2.0019531 C 24.819813 2.0024531 24.709016 2.0206406 24.603516 2.0566406 L 3.671875 9.3417969 C 3.227875 9.4957969 2.9498125 9.93925 3.0078125 10.40625 L 6.3164062 37.529297 C 6.3554062 37.850297 6.5450781 38.133109 6.8300781 38.287109 L 24.478516 47.878906 C 24.626516 47.959906 24.791078 48 24.955078 48 C 25.120078 48 25.286547 47.958953 25.435547 47.876953 L 43.173828 38.154297 C 43.455828 37.999297 43.647547 37.717438 43.685547 37.398438 L 46.992188 10.277344 C 47.050187 9.8083437 46.769312 9.3609844 46.320312 9.2089844 L 25.253906 2.0527344 C 25.148906 2.0177344 25.039562 2.0014531 24.929688 2.0019531 z M 25 7 L 38 35 L 33.5625 35 L 30.78125 29.007812 L 19.21875 29.007812 L 16.4375 35 L 12 35 L 25 7 z M 25 16.5 L 21.080078 25 L 28.919922 25 L 25 16.5 z" />
              </svg>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="144px"
                height="144px"
                aria-label="Firebase"
              >
                <path
                  fill="#ff8f00"
                  d="M8,37L23.234,8.436c0.321-0.602,1.189-0.591,1.494,0.02L30,19L8,37z"
                />
                <path
                  fill="#ffa000"
                  d="M8,36.992l5.546-34.199c0.145-0.895,1.347-1.089,1.767-0.285L26,22.992L8,36.992z"
                />
                <path
                  fill="#ff6f00"
                  d="M8.008 36.986L8.208 36.829 25.737 22.488 20.793 13.012z"
                />
                <path
                  fill="#ffc400"
                  d="M8,37l26.666-25.713c0.559-0.539,1.492-0.221,1.606,0.547L40,37l-15,8.743 c-0.609,0.342-1.352,0.342-1.961,0L8,37z"
                />
              </svg>
            </div>
            <div>
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="144px"
                height="144px"
                aria-label="NextJS"
              >
                <path d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 12.972 35.028 4 24 4 z M 24 7 C 33.374 7 41 14.626 41 24 C 41 29.852 38.027672 35.020078 33.513672 38.080078 L 19.742188 17.660156 C 19.375187 17.113156 18.687547 16.874453 18.060547 17.064453 C 17.430547 17.258453 17 17.841 17 18.5 L 17 31.5 C 17 32.328 17.672 33 18.5 33 C 19.328 33 20 32.328 20 31.5 L 20 23.40625 L 30.876953 39.533203 C 28.770953 40.468203 26.448 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 z M 29.5 15 C 28.672 15 28 15.672 28 16.5 L 28 24.986328 L 31 29.289062 L 31 16.5 C 31 15.672 30.328 15 29.5 15 z" />
              </svg>
            </div>
            <div>
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="144px"
                height="144px"
                aria-label="React"
              >
                <path d="M 5.4179688 1.9199219 C 5.1428281 1.9367871 4.8730801 2.0110677 4.625 2.1542969 C 4.1288397 2.4407552 3.8280443 2.9434418 3.7070312 3.4921875 C 3.586018 4.0409331 3.615847 4.6519208 3.7363281 5.3066406 C 3.7526006 5.3950689 3.7830534 5.4900657 3.8027344 5.5800781 C 3.6077337 5.6404857 3.4034082 5.6968562 3.2246094 5.765625 C 2.5967094 6.0071252 2.0698262 6.2961554 1.6738281 6.65625 C 1.2778301 7.0163446 1 7.4791793 1 8 C 1 8.5208207 1.2778301 8.9836554 1.6738281 9.34375 C 2.0698262 9.7038446 2.5967094 9.9928748 3.2246094 10.234375 C 3.4190532 10.309161 3.639983 10.370674 3.8535156 10.435547 C 3.8246734 10.580679 3.783799 10.73335 3.7636719 10.873047 C 3.6705619 11.5193 3.6710007 12.103332 3.7929688 12.615234 C 3.9149367 13.127137 4.1798065 13.588671 4.625 13.845703 C 5.0701935 14.102736 5.6011641 14.101496 6.1054688 13.951172 C 6.6097738 13.800848 7.1177431 13.509231 7.6308594 13.105469 C 7.7411175 13.018709 7.8522854 12.907452 7.9628906 12.810547 C 8.0427377 12.884098 8.1208564 12.970644 8.2011719 13.039062 C 8.7079351 13.470762 9.2220782 13.801131 9.7578125 13.970703 C 10.293546 14.140276 10.87884 14.132162 11.375 13.845703 C 11.87116 13.559245 12.171956 13.056558 12.292969 12.507812 C 12.413982 11.959067 12.384152 11.348078 12.263672 10.693359 C 12.247399 10.604931 12.216947 10.509934 12.197266 10.419922 C 12.392266 10.359514 12.596592 10.303144 12.775391 10.234375 C 13.403291 9.9928748 13.930174 9.7038446 14.326172 9.34375 C 14.72217 8.9836554 15 8.5208207 15 8 C 15 7.4791793 14.72217 7.0163446 14.326172 6.65625 C 13.930174 6.2961554 13.403291 6.0071252 12.775391 5.765625 C 12.580947 5.6908389 12.360017 5.6293262 12.146484 5.5644531 C 12.175327 5.4193206 12.216201 5.2666501 12.236328 5.1269531 C 12.329437 4.4807006 12.328999 3.8966676 12.207031 3.3847656 C 12.085063 2.8728627 11.820194 2.4113295 11.375 2.1542969 C 10.929806 1.8972643 10.398836 1.8985039 9.8945312 2.0488281 C 9.3902268 2.1991514 8.8822567 2.4907694 8.3691406 2.8945312 C 8.2588824 2.9812915 8.1477146 3.0925481 8.0371094 3.1894531 C 7.9572623 3.1159023 7.8791436 3.0293563 7.7988281 2.9609375 C 7.2920649 2.5292379 6.7779218 2.1988691 6.2421875 2.0292969 C 5.9743204 1.9445107 5.6931094 1.9030566 5.4179688 1.9199219 z M 5.4863281 2.9121094 C 5.6184787 2.9052569 5.765789 2.9274532 5.9394531 2.9824219 C 6.2867814 3.0923592 6.7123258 3.3478155 7.1523438 3.7226562 C 7.2080882 3.7701436 7.2660916 3.8336482 7.3222656 3.8847656 C 6.9849764 4.2457877 6.6542592 4.6470665 6.3320312 5.0878906 C 5.7804989 5.1422545 5.2611639 5.2252604 4.7695312 5.3300781 C 4.7554028 5.2642027 4.7305516 5.1910856 4.71875 5.1269531 C 4.6141374 4.5584661 4.6070913 4.062795 4.6855469 3.7070312 C 4.7640024 3.3512674 4.8994728 3.1497395 5.125 3.0195312 C 5.2377636 2.9544271 5.3541775 2.9189618 5.4863281 2.9121094 z M 10.59375 2.9433594 C 10.707096 2.9484996 10.798664 2.9754582 10.875 3.0195312 C 11.027672 3.1076762 11.156513 3.2802518 11.236328 3.6152344 C 11.316138 3.9502178 11.326744 4.4249246 11.246094 4.984375 C 11.230995 5.089199 11.197083 5.2099673 11.175781 5.3203125 C 10.70398 5.2219048 10.207844 5.1421816 9.6816406 5.0898438 C 9.3790873 4.6658633 9.0653319 4.266774 8.7402344 3.9023438 C 8.82247 3.8312396 8.9076298 3.7451038 8.9882812 3.6816406 C 9.4324776 3.3321106 9.8496759 3.1042298 10.179688 3.0058594 C 10.344693 2.9566744 10.480404 2.9382191 10.59375 2.9433594 z M 8.0234375 4.6035156 C 8.1406094 4.736358 8.2570471 4.8697762 8.3730469 5.0136719 C 8.2471698 5.011 8.1276206 5 8 5 C 7.8810536 5 7.7697802 5.0113493 7.6523438 5.0136719 C 7.776207 4.8657329 7.8994254 4.7376076 8.0234375 4.6035156 z M 8 6 C 8.3895493 6 8.7673112 6.0186935 9.1367188 6.0449219 C 9.3440619 6.3534994 9.5438442 6.6733738 9.7324219 7 C 9.9207169 7.3261363 10.098358 7.6588368 10.261719 7.9921875 C 10.101925 8.3259539 9.9274829 8.6621442 9.7324219 9 C 9.538936 9.3351273 9.3362843 9.651993 9.1289062 9.9550781 C 8.7618727 9.9809578 8.3868763 10 8 10 C 7.6104507 10 7.2326888 9.9813065 6.8632812 9.9550781 C 6.6559381 9.6465006 6.4561558 9.3266263 6.2675781 9 C 6.0792832 8.6738637 5.9016422 8.3411632 5.7382812 8.0078125 C 5.8980761 7.6740461 6.072517 7.3378558 6.2675781 7 C 6.461064 6.6648727 6.6637157 6.348007 6.8710938 6.0449219 C 7.2381273 6.0190422 7.6131237 6 8 6 z M 5.6015625 6.1855469 C 5.5363195 6.2928259 5.4660042 6.3897369 5.4023438 6.5 C 5.3385814 6.6104395 5.2888915 6.7197606 5.2285156 6.8300781 C 5.1585596 6.6490298 5.0977921 6.4728993 5.0390625 6.296875 C 5.2255387 6.2582688 5.4032789 6.217086 5.6015625 6.1855469 z M 10.402344 6.1855469 C 10.587586 6.2150646 10.752771 6.2553116 10.927734 6.2910156 C 10.8745 6.4621003 10.826543 6.6290395 10.761719 6.8066406 C 10.70552 6.7049102 10.655841 6.6007784 10.597656 6.5 C 10.535691 6.3926727 10.466366 6.2914551 10.402344 6.1855469 z M 11.900391 6.5371094 C 12.074389 6.5907581 12.260427 6.6393771 12.416016 6.6992188 C 12.964383 6.9101295 13.390507 7.1583872 13.652344 7.3964844 C 13.914181 7.6345815 14 7.8304648 14 8 C 14 8.1695352 13.914181 8.3654185 13.652344 8.6035156 C 13.390507 8.8416128 12.964383 9.0898705 12.416016 9.3007812 C 12.270924 9.3565857 12.096701 9.4026838 11.935547 9.453125 C 11.778725 8.9713787 11.580507 8.4814102 11.355469 7.9882812 C 11.574886 7.4916229 11.756743 7.0072627 11.900391 6.5371094 z M 4.0644531 6.546875 C 4.2212746 7.0286213 4.4194927 7.5185898 4.6445312 8.0117188 C 4.4251138 8.5083771 4.2432565 8.9927373 4.0996094 9.4628906 C 3.925611 9.4092419 3.7395724 9.3606229 3.5839844 9.3007812 C 3.0356167 9.0898705 2.6094932 8.8416128 2.3476562 8.6035156 C 2.0858195 8.3654185 2 8.1695352 2 8 C 2 7.8304648 2.0858195 7.6345815 2.3476562 7.3964844 C 2.6094932 7.1583872 3.0356167 6.9101296 3.5839844 6.6992188 C 3.7290758 6.6434143 3.9032992 6.5973162 4.0644531 6.546875 z M 8 7 A 1 1 0 0 0 8 9 A 1 1 0 0 0 8 7 z M 10.771484 9.1699219 C 10.84144 9.3509702 10.902208 9.5271007 10.960938 9.703125 C 10.774461 9.7417312 10.596721 9.782914 10.398438 9.8144531 C 10.46368 9.7071741 10.533996 9.6102631 10.597656 9.5 C 10.661419 9.3895605 10.711108 9.2802394 10.771484 9.1699219 z M 5.2382812 9.1933594 C 5.2944803 9.2950898 5.3441593 9.3992216 5.4023438 9.5 C 5.4643092 9.6073273 5.5336339 9.7085449 5.5976562 9.8144531 C 5.4124139 9.7849354 5.2472286 9.7446884 5.0722656 9.7089844 C 5.1255025 9.5378997 5.1734558 9.3709605 5.2382812 9.1933594 z M 11.230469 10.669922 C 11.244597 10.735797 11.269448 10.808914 11.28125 10.873047 C 11.385863 11.441534 11.392909 11.937205 11.314453 12.292969 C 11.236003 12.648733 11.100527 12.850261 10.875 12.980469 C 10.649473 13.110677 10.407875 13.127521 10.060547 13.017578 C 9.7132183 12.907646 9.2876743 12.652185 8.8476562 12.277344 C 8.7919118 12.229856 8.7339084 12.166352 8.6777344 12.115234 C 9.0150235 11.754212 9.3457408 11.352933 9.6679688 10.912109 C 10.219501 10.857745 10.738836 10.77474 11.230469 10.669922 z M 4.8242188 10.679688 C 5.2960195 10.778095 5.7921558 10.857818 6.3183594 10.910156 C 6.6209128 11.334137 6.9346681 11.733226 7.2597656 12.097656 C 7.17753 12.16876 7.0923702 12.254896 7.0117188 12.318359 C 6.5675222 12.667889 6.1503238 12.89577 5.8203125 12.994141 C 5.4903012 13.092511 5.2776722 13.068614 5.125 12.980469 C 4.9723278 12.892324 4.8434863 12.719749 4.7636719 12.384766 C 4.6838574 12.049782 4.6733024 11.575076 4.7539062 11.015625 C 4.769009 10.910801 4.8029135 10.790033 4.8242188 10.679688 z M 7.6269531 10.986328 C 7.7528302 10.989 7.8723794 11 8 11 C 8.1189464 11 8.2302198 10.988651 8.3476562 10.986328 C 8.223793 11.134267 8.1005746 11.262392 7.9765625 11.396484 C 7.8593906 11.263642 7.7429529 11.130224 7.6269531 10.986328 z" />
              </svg>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="144px"
                height="144px"
                aria-label="Tailwind"
              >
                <path
                  fill="#00acc1"
                  d="M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.6 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-6.4,0-10.4,3.199-12,9.598 c2.4-3.199,5.2-4.399,8.4-3.599c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,5.152,11.025,5.152 c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.599c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24 L12,24z"
                />
              </svg>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="144px"
                height="144px"
                aria-label="GraphQL"
              >
                <path
                  fill="#ff4081"
                  d="M24.5,45.161L7,34.82V14.18L24.5,3.839L42,14.18V34.82L24.5,45.161z M9,33.68l15.5,9.159L40,33.68 V15.32L24.5,6.161L9,15.32V33.68z"
                />
                <circle cx="24.5" cy="5.5" r="3.5" fill="#ff4081" />
                <circle cx="24.5" cy="43.5" r="3.5" fill="#ff4081" />
                <circle cx="8.5" cy="33.5" r="3.5" fill="#ff4081" />
                <circle cx="40.5" cy="33.5" r="3.5" fill="#ff4081" />
                <circle cx="8.5" cy="15.5" r="3.5" fill="#ff4081" />
                <circle cx="40.5" cy="15.5" r="3.5" fill="#ff4081" />
                <path
                  fill="#ff4081"
                  d="M42.72,35H6.28L24.5,2.978L42.72,35z M9.72,33H39.28L24.5,7.022L9.72,33z"
                />
              </svg>
            </div>

            <div>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="144px"
                height="144px"
                aria-label="Redwood"
              >
                <path d="M6.989 3.47l4.66 3.181c.105.07.228.108.354.111a.634.634 0 0 0 .354-.111l4.664-3.192a.637.637 0 0 0-.089-1.087L12.272.065a.64.64 0 0 0-.56 0L7.067 2.372a.636.636 0 0 0-.078 1.098zm6.597 4.179c0 .211.104.408.276.528l3.736 2.553a.628.628 0 0 0 .776-.05l3.134-2.803a.637.637 0 0 0-.028-.973l-2.992-2.393a.635.635 0 0 0-.751-.029l-3.874 2.65a.644.644 0 0 0-.277.517zm-9.291 3.474a.64.64 0 0 1 .209.538.625.625 0 0 1-.315.485l-2.231 1.337a.63.63 0 0 1-.718-.049.64.64 0 0 1-.21-.693l.825-2.596a.63.63 0 0 1 1.023-.281l1.417 1.259zm12.1.271l-4.033-2.76a.634.634 0 0 0-.708 0l-4.033 2.76a.646.646 0 0 0-.276.485.664.664 0 0 0 .212.521l4.03 3.605a.635.635 0 0 0 .842 0l4.03-3.605a.647.647 0 0 0-.064-1.006zm-10.758-.713l-3.13-2.803a.648.648 0 0 1-.213-.503.626.626 0 0 1 .237-.481l2.992-2.407a.641.641 0 0 1 .754-.029l3.87 2.65a.639.639 0 0 1 0 1.07l-3.732 2.553a.633.633 0 0 1-.778-.05zm16.073 4.026l-3.187-1.908a.627.627 0 0 0-.744.071l-3.895 3.477a.644.644 0 0 0-.204.587.636.636 0 0 0 .388.483l5.404 2.19a.634.634 0 0 0 .815-.332l1.675-3.752a.64.64 0 0 0-.252-.816zm.442-4.561l.825 2.596h-.007a.635.635 0 0 1-.927.742l-2.234-1.337a.623.623 0 0 1-.305-.485.631.631 0 0 1 .209-.538l1.416-1.262a.63.63 0 0 1 1.023.284zm-11.82 6.786a.637.637 0 0 0-.202-.585L6.235 12.87a.627.627 0 0 0-.744-.071l-3.187 1.908a.648.648 0 0 0-.255.813l1.678 3.752a.632.632 0 0 0 .814.332l5.4-2.19a.637.637 0 0 0 .391-.482zm1.912 1.07l4.334 1.755c.212.091.358.29.382.521a.635.635 0 0 1-.269.596l-4.338 3.013A.625.625 0 0 1 12 24a.64.64 0 0 1-.354-.114l-4.334-3.013a.635.635 0 0 1 .124-1.117l4.334-1.755a.642.642 0 0 1 .474.001z" />
              </svg>
            </div>
          </span>
        </div>
        <div className="py-8 text-center text-sm text-color-text lg:text-base">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
          <span role="img" aria-label="Love">
            ♥
          </span>{' '}
          by <a href="https://creativedesignsguru.com">CreativeDesignsGuru </a>
          using NextJS, React, and TailwindCSS. Icons by{' '}
          <a href="https://icons8.com">Icons8</a>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
