import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RoadmapSection from "./RoadmapSection";
import { MemoryRouter } from "react-router-dom";

describe("RoadmapSection", () => {
  it("renders section header and description", () => {
    render(
      <MemoryRouter>
        <RoadmapSection />
      </MemoryRouter>
    );
    expect(screen.getByText(/Your Chess Learning/i)).toBeInTheDocument();
    expect(
      screen.getByText(/structured path from complete beginner to advanced/i)
    ).toBeInTheDocument();
  });

  it("renders SkillLevelCard components for each skill level", () => {
    render(
      <MemoryRouter>
        <RoadmapSection />
      </MemoryRouter>
    );
    // Use getAllByText for skill level headings
    expect(screen.getAllByText(/Beginner/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Intermediate/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Advanced/i).length).toBeGreaterThan(0);
  });

  it("renders call to action", () => {
    render(
      <MemoryRouter>
        <RoadmapSection />
      </MemoryRouter>
    );
    expect(screen.getByText(/Not sure where to start/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse All Resources/i)).toBeInTheDocument();
  });
});
