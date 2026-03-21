
function inferType(name = "", language = "") {
  const lower = name.toLowerCase();

  if (language === "Dart") return "Flutter Project";
  if (language === "Swift") return "SwiftUI / Swift Project";
  if (language === "JavaScript") return "Web Project";
  if (lower.includes("weather")) return "Weather App";
  if (lower.includes("quiz")) return "Quiz App";

  return language ? `${language} Project` : "Software Project";
}

function inferStack(repo) {
  const stack = [];
  const name = repo.name.toLowerCase();

  if (repo.language) stack.push(repo.language);
  if (name.includes("flutter") || repo.language === "Dart") stack.push("Flutter");
  if (name.includes("sqflite")) stack.push("SQLite");
  if (name.includes("weather")) stack.push("API");
  if (name.includes("provider")) stack.push("Provider");

  return [...new Set(stack)].slice(0, 5);
}
function isValidScreenshot(fileName) {
  const lower = fileName.toLowerCase();

  const blockedKeywords = [
    "icon",
    "logo",
    "playstore",
    "play-store",
    "googleplay",
    "google-play",
    "appstore",
    "app-store",
    "feature-graphic",
    "banner",
  ];

  const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(lower);
  const isBlocked = blockedKeywords.some((keyword) => lower.includes(keyword));

  return isImage && !isBlocked;
}

function removeDuplicateImages(files) {
  const seen = new Set();

  return files.filter((file) => {
    const normalized = file.name
      .toLowerCase()
      .replace(/\.[^.]+$/, "")
      .replace(/[\s_-]+/g, "")
      .replace(/\(\d+\)/g, "")
      .replace(/\d{2,}$/g, "");

    if (seen.has(normalized)) {
      return false;
    }

    seen.add(normalized);
    return true;
  });
}

async function fetchRepoScreenshots(username, repoName) {
  const folderNames = ["Screenshots", "screenshots"];

  for (const folderName of folderNames) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/contents/${folderName}`
      );

      if (!res.ok) continue;

      const files = await res.json();

      if (!Array.isArray(files)) continue;

      const cleanedFiles = removeDuplicateImages(
        files
          .filter((file) => file.type === "file")
          .filter((file) => isValidScreenshot(file.name))
      );

      return cleanedFiles
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { numeric: true })
        )
        .map((file) => file.download_url)
        .filter(Boolean);
    } catch {
      continue;
    }
  }

  return [];
}
// async function fetchRepoScreenshots(username, repoName) {
//   const folderNames = ["Screenshots", "screenshots"];

//   for (const folderName of folderNames) {
//     try {
//       const res = await fetch(
//         `https://api.github.com/repos/${username}/${repoName}/contents/${folderName}`
//       );

//       if (!res.ok) continue;

//       const files = await res.json();

//       if (!Array.isArray(files)) continue;

//       const images = files
//         .filter((file) => file.type === "file")
//         .filter((file) => /\.(png|jpg|jpeg|gif|webp)$/i.test(file.name))
//         .sort((a, b) =>
//           a.name.localeCompare(b.name, undefined, { numeric: true })
//         )
//         .map((file) => file.download_url)
//         .filter(Boolean);

//       return images;
//     } catch {
//       continue;
//     }
//   }

//   return [];
// }

async function toProject(username, repo) {
  const screenshots = await fetchRepoScreenshots(username, repo.name);

  return {
    title: repo.name,
    type: inferType(repo.name, repo.language),
    description: repo.description || "Public GitHub repository.",
    stack: inferStack(repo),
    github: repo.html_url,
    previewText: repo.name,
    screenshots,
    stars: repo.stargazers_count ?? 0,
    updatedAt: repo.updated_at ?? null,
  };
}

export async function fetchGithubProjects(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );

    if (!response.ok) return [];

    const repos = await response.json();

    if (!Array.isArray(repos)) return [];

    const publicRepos = repos.filter((repo) => !repo.fork);

    const projects = await Promise.all(
      publicRepos.map((repo) => toProject(username, repo))
    );

   return projects.sort((a, b) => {
  const recentA = new Date(a.updatedAt ?? 0).getTime();
  const recentB = new Date(b.updatedAt ?? 0).getTime();

  const scoreA = (a.stars ?? 0) * 2 + recentA;
  const scoreB = (b.stars ?? 0) * 2 + recentB;

  return scoreB - scoreA;
});
  } catch {
    return [];
  }
}