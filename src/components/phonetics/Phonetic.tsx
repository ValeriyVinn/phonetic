"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import css from "./Phonetic.module.css";
import videoData from "@/data/phonetic.json";
import Modal from "@/components/modal/Modal";
import PhoneticMenu from "@/components/phonetic-menu/PhoneticMenu";

// Тип для даних відео
interface VideoData {
  id: number;
  phoneme: string;
  title: string;
  src: string;
  mnemonic: string;
  textFile: string; // використовуємо textFile з JSON
  accordeon: string[];
}

// === Статичні динамічні імпорти всіх MDX ===
export const mdxImports: Record<string, any> = {
  "1": dynamic(() => import("@/data/text/1.mdx"), { ssr: false }),
  "2": dynamic(() => import("@/data/text/2.mdx"), { ssr: false }),
  "3": dynamic(() => import("@/data/text/3.mdx"), { ssr: false }),
  "4": dynamic(() => import("@/data/text/4.mdx"), { ssr: false }),
  "5": dynamic(() => import("@/data/text/5.mdx"), { ssr: false }),
  "6": dynamic(() => import("@/data/text/6.mdx"), { ssr: false }),
  "7": dynamic(() => import("@/data/text/7.mdx"), { ssr: false }),
  "8": dynamic(() => import("@/data/text/8.mdx"), { ssr: false }),
  "9": dynamic(() => import("@/data/text/9.mdx"), { ssr: false }),
  "10": dynamic(() => import("@/data/text/10.mdx"), { ssr: false }),
  "11": dynamic(() => import("@/data/text/11.mdx"), { ssr: false }),
  "12": dynamic(() => import("@/data/text/12.mdx"), { ssr: false }),
  "13": dynamic(() => import("@/data/text/13.mdx"), { ssr: false }),
  "14": dynamic(() => import("@/data/text/14.mdx"), { ssr: false }),
  "15": dynamic(() => import("@/data/text/15.mdx"), { ssr: false }),
  "16": dynamic(() => import("@/data/text/16.mdx"), { ssr: false }),
  "17": dynamic(() => import("@/data/text/17.mdx"), { ssr: false }),
  "18": dynamic(() => import("@/data/text/18.mdx"), { ssr: false }),
  "19": dynamic(() => import("@/data/text/19.mdx"), { ssr: false }),
  "20": dynamic(() => import("@/data/text/20.mdx"), { ssr: false }),
  "21": dynamic(() => import("@/data/text/21.mdx"), { ssr: false }),
  "22": dynamic(() => import("@/data/text/22.mdx"), { ssr: false }),
  "23": dynamic(() => import("@/data/text/23.mdx"), { ssr: false }),
  "24": dynamic(() => import("@/data/text/24.mdx"), { ssr: false }),
  "25": dynamic(() => import("@/data/text/25.mdx"), { ssr: false }),
  "26": dynamic(() => import("@/data/text/26.mdx"), { ssr: false }),
  "27": dynamic(() => import("@/data/text/27.mdx"), { ssr: false }),
  "28": dynamic(() => import("@/data/text/28.mdx"), { ssr: false }),
  "29": dynamic(() => import("@/data/text/29.mdx"), { ssr: false }),
  "30": dynamic(() => import("@/data/text/30.mdx"), { ssr: false }),
  "31": dynamic(() => import("@/data/text/31.mdx"), { ssr: false }),
  "32": dynamic(() => import("@/data/text/32.mdx"), { ssr: false }),
  "33": dynamic(() => import("@/data/text/33.mdx"), { ssr: false }),
  "34": dynamic(() => import("@/data/text/34.mdx"), { ssr: false }),
  "35": dynamic(() => import("@/data/text/35.mdx"), { ssr: false }),
  "36": dynamic(() => import("@/data/text/36.mdx"), { ssr: false }),
  "37": dynamic(() => import("@/data/text/37.mdx"), { ssr: false }),
  "38": dynamic(() => import("@/data/text/38.mdx"), { ssr: false }),
  "39": dynamic(() => import("@/data/text/39.mdx"), { ssr: false }),
  "40": dynamic(() => import("@/data/text/40.mdx"), { ssr: false }),
  "41": dynamic(() => import("@/data/text/41.mdx"), { ssr: false }),
  "42": dynamic(() => import("@/data/text/42.mdx"), { ssr: false }),
  "43": dynamic(() => import("@/data/text/43.mdx"), { ssr: false }),
  "44": dynamic(() => import("@/data/text/44.mdx"), { ssr: false }),
  "45": dynamic(() => import("@/data/text/45.mdx"), { ssr: false }),
  "46": dynamic(() => import("@/data/text/46.mdx"), { ssr: false }),
  "47": dynamic(() => import("@/data/text/47.mdx"), { ssr: false }),
  "48": dynamic(() => import("@/data/text/48.mdx"), { ssr: false }),
  "49": dynamic(() => import("@/data/text/49.mdx"), { ssr: false }),
};

export default function Phonetics() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<boolean[]>([]);

  useEffect(() => {
    const savedState = videoData.map(
      (_, i) => localStorage.getItem(`accordion-${i}`) === "true"
    );
    setOpenAccordions(savedState);
  }, []);

  const openModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  const toggleAccordion = (index: number) => {
    const updatedAccordions = [...openAccordions];
    updatedAccordions[index] = !openAccordions[index];
    localStorage.setItem(`accordion-${index}`, updatedAccordions[index].toString());
    setOpenAccordions(updatedAccordions);
  };

  return (
    <div className={`${css.phonetics} container`}>
      <div className={css.sideMenu}>
        <PhoneticMenu />
      </div>

      <div className={css.main}>
        {videoData.map((video: VideoData, index: number) => {
          const PhoneticText = mdxImports[video.textFile];

          return (
            <div className={css.article} key={video.id} id={`video-${video.id}`}>
              <div className={css.chart}>
                <h2 className={css.phoneticsSectionHeader}>{video.title}</h2>
                <button
                  className={css.btnWatchVideo}
                  onClick={() => openModal(video.src)}
                >
                  Start
                </button>
              </div>

              <button
                className={`${css.accordion} ${
                  openAccordions[index] ? "active" : ""
                }`}
                onClick={() => toggleAccordion(index)}
              >
                WHAT LETTER SOUNDS LIKE
              </button>
              <div
                className={css.panel}
                style={{
                  maxHeight: openAccordions[index] ? "1000px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                {video.accordeon.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>

              <div className={css.mnemonic}>
                <div className={css.paragraph}>
                  {PhoneticText ? <PhoneticText /> : <p>Text not found</p>}
                </div>
                <button
                  className={css.btnWatchVideo}
                  onClick={() => openModal(video.mnemonic)}
                >
                  Mnemonic
                </button>
              </div>
            </div>
          );
        })}

        {isModalOpen && selectedVideo && (
          <Modal closeModal={closeModal}>
            <iframe
              width="560"
              height="315"
              src={selectedVideo}
              style={{
                border: "1px solid green",
                borderRadius: "5px",
                overflow: "hidden",
                padding: "3px",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </Modal>
        )}
      </div>
    </div>
  );
}
