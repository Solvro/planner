import * as cheerio from "cheerio";
import iconv from "iconv-lite";

import logger from "@adonisjs/core/services/logger";

interface Lecturer {
  rating: string;
  name: string;
  lastName: string;
  opinions: string;
  visits: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CATEGORIES_STARTS_URLS = [
  "https://polwro.com/viewforum.php?f=6&topicdays=0&start=0",
  "https://polwro.com/viewforum.php?f=7&topicdays=0&start=0",
  "https://polwro.com/viewforum.php?f=25&topicdays=0&start=0",
  "https://polwro.com/viewforum.php?f=8&topicdays=0&start=0",
  "https://polwro.com/viewforum.php?f=9&topicdays=0&start=0",
  "https://polwro.com/viewforum.php?f=10&topicdays=0&start=0",
  "https://polwro.com/viewforum.php?f=11&topicdays=0&start=0",
  "https://polwro.com/viewforum.php?f=12&topicdays=0&start=0",
  "https://polwro.com/viewforum.php?f=42&topicdays=0&start=0",
];

async function fetchLecturers(url: string, timeout = 100000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7",
        Cookie:
          "pmlist=; bb038dfef1_counter=1; bb038dfef1_sid=8b9aebe43f5c5b6263b21c3772b87244; bb038dfef1_data=a%3A2%3A%7Bs%3A11%3A%22autologinid%22%3Bs%3A0%3A%22%22%3Bs%3A6%3A%22userid%22%3Bs%3A6%3A%22144199%22%3B%7D",
      },

      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  }
}

function removeTitles(data: string[]): string[] {
  const titlesToRemove = [
    "mg",
    "mg.",
    "mgr",
    "mgr.",
    "inż",
    "inż.",
    "inz",
    "inz.",
    "dr",
    "dr.",
    "prof",
    "prof.",
    "hab",
    "hab.",
  ];
  return data.filter((word) => !titlesToRemove.includes(word.toLowerCase()));
}

const scrapLecturersPage = async (url: string) => {
  const lecturers: Lecturer[] = [];
  const response = await fetchLecturers(url);
  if (!response.ok) {
    logger.info("Something went wrong in fetching lecturers");
    return;
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const body = iconv.decode(buffer, "ISO-8859-2");

  const $ = cheerio.load(body);
  const block = $("tbody")
    .find("td")
    .children("div.hrw")
    .children("div.img.folder, div.img.folder_hot, div.img.folder_locked");
  block.each((_, element) => {
    const smallBlock = $(element);
    const text = smallBlock.text().trim().replace(/\s+/g, " ");
    const splitedData = removeTitles(text.split(" "));
    const rating = splitedData[0].replace(",", ".");
    const name = splitedData[2].replace(",", "");
    const lastName = splitedData[1].replace(",", "");
    const opinionsMatch = /Opinii: (\d+)/.exec(text);
    const visitsMatch = /Odwiedzin: (\d+)/.exec(text);

    const opinions = opinionsMatch !== null ? opinionsMatch[1] : "0";
    const visits = visitsMatch !== null ? visitsMatch[1] : "0";

    lecturers.push({ rating, name, lastName, opinions, visits });
  });
  const nextPageDiv = $("tbody")
    .find("ul.vfigntop")
    .find("li.rr")
    .find("div")
    .children("a");

  let nextPageUrl = "";
  nextPageDiv.each((_, element) => {
    if ($(element).text().includes("następna")) {
      nextPageUrl = `https://polwro.com/${$(element).attr("href")}`;
    }
  });

  await delay(500);
  return { lecturers, nextPage: nextPageUrl };
};

const scrapLecturersForCategory = async (url: string) => {
  const lecturers: Lecturer[] = [];
  let nextPage = url;
  while (nextPage !== "") {
    const result = await scrapLecturersPage(nextPage);
    if (result === undefined) {
      return lecturers;
    }

    lecturers.push(...result.lecturers);
    nextPage = result.nextPage;
  }
  return lecturers;
};

export const scrapLecturers = async () => {
  const lecturers: Lecturer[] = [];
  for (const url of CATEGORIES_STARTS_URLS) {
    logger.info("scraping category", url);
    const lecturersFromCategory = await scrapLecturersForCategory(url);
    lecturers.push(...lecturersFromCategory);
  }
  return lecturers;
};
