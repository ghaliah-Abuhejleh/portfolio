import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import EducationCertificationsSection from "./EducationCertificationsSection";
import { certifications } from "../data/portfolioData";

beforeAll(() => {
  window.matchMedia = () => ({
    matches: true,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
});

test("shows the requested four cards and keeps all certificates grouped without duplicates", () => {
  render(<EducationCertificationsSection certifications={certifications} />);
  expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
    "Meta React Specialization",
    "Google UX Design Professional Certificate",
    "The Complete Flutter Development Bootcamp with Dart",
    "Artificial Intelligence Fundamentals",
  ]);
  expect(screen.getByText("2 Courses")).toBeVisible();
  expect(screen.getByText("8 Courses")).toBeVisible();
  const records = certifications.flatMap((certificate) => [certificate, ...certificate.courses]);
  expect(records).toHaveLength(15);
  expect(new Set(records.map((certificate) => certificate.id)).size).toBe(15);
  expect(screen.queryByRole("heading", { name: "React Basics" })).not.toBeInTheDocument();
});

test("course expansion stays independent of View More and View Less", async () => {
  render(<EducationCertificationsSection certifications={certifications} />);
  const metaButton = screen.getByRole("button", { name: "View courses for Meta React Specialization" });
  fireEvent.click(metaButton);
  expect(metaButton).toHaveAttribute("aria-expanded", "true");
  await waitFor(() => expect(screen.getByRole("heading", { name: "React Basics" })).toBeVisible());
  expect(screen.queryByRole("heading", { name: "Foundations of User Experience (UX) Design" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "View More Certifications" }));
  const webCard = screen.getByRole("heading", { name: "The Complete 2023 Web Development Bootcamp" }).closest("article");
  await waitFor(() => expect(webCard).toBeVisible());
  expect(within(webCard).queryByRole("link")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "View Less Certifications" }));
  expect(webCard).not.toBeVisible();
  expect(metaButton).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(metaButton);
  expect(screen.queryByRole("link", { name: /View credential for React Basics/ })).not.toBeInTheDocument();
});

test("expanded groups preserve every course credential and description", async () => {
  render(<EducationCertificationsSection certifications={certifications} />);
  for (const certificate of certifications.filter((item) => item.courses.length)) {
    fireEvent.click(screen.getByRole("button", { name: `View courses for ${certificate.title}` }));
    for (const course of certificate.courses) {
      await waitFor(() => expect(screen.getByText(course.description)).toBeVisible());
      expect(screen.getByText(`Credential ID: ${course.credentialId}`)).toBeVisible();
      expect(screen.getByRole("link", { name: `View credential for ${course.title} (opens in a new tab)` }))
        .toHaveAttribute("href", course.url);
    }
  }
});

