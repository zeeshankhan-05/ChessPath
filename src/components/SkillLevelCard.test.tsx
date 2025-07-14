import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillLevelCard from "./SkillLevelCard";

const baseProps = {
  level: "beginner",
  title: "Beginner",
  eloRange: "0-800",
  description: "Test description",
  colorScheme: {
    primary: "text-beginner",
    background: "bg-beginner",
    border: "border-beginner",
    shadow: "shadow-beginner",
  },
  topics: [
    {
      id: "topic-1",
      title: "Topic 1",
      description: "Topic 1 desc",
      timeEstimate: "1 week",
      difficulty: "Beginner",
      skills: ["Skill 1", "Skill 2"],
      resources: [
        {
          title: "Resource 1",
          description: "Resource desc",
          url: "https://example.com",
          type: "website",
          difficulty: "Beginner",
        },
      ],
    },
  ],
};

describe("SkillLevelCard", () => {
  it("renders with valid props", () => {
    render(<SkillLevelCard {...baseProps} />);
    // Use getAllByText and check for heading
    const headings = screen.getAllByText("Beginner");
    expect(headings.some((el) => el.tagName === "H3")).toBe(true);
    expect(screen.getByText("0-800")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("Topic 1")).toBeInTheDocument();
  });

  it("handles empty topics gracefully", () => {
    render(<SkillLevelCard {...baseProps} topics={[]} />);
    const headings = screen.getAllByText("Beginner");
    expect(headings.some((el) => el.tagName === "H3")).toBe(true);
    // Should not throw or render any topic cards
    expect(screen.queryByText("Topic 1")).not.toBeInTheDocument();
  });

  it("expands and collapses topic details", () => {
    render(<SkillLevelCard {...baseProps} />);
    // Use getAllByRole and select the first button for Topic 1
    const topicButtons = screen.getAllByRole("button", { name: /Topic 1/i });
    fireEvent.click(topicButtons[0]);
    expect(screen.getByText(/Skills You'll Learn/i)).toBeInTheDocument();
    fireEvent.click(topicButtons[0]);
    expect(screen.queryByText(/Skills You'll Learn/i)).not.toBeInTheDocument();
  });

  it("handles missing/invalid resource URLs gracefully", () => {
    const badProps = {
      ...baseProps,
      topics: [
        {
          ...baseProps.topics[0],
          resources: [{ ...baseProps.topics[0].resources[0], url: "" }],
        },
      ],
    };
    render(<SkillLevelCard {...badProps} />);
    // Expand topic to show resources
    const topicButtons = screen.getAllByRole("button", { name: /Topic 1/i });
    fireEvent.click(topicButtons[0]);
    // Use a function matcher for resource title
    expect(
      screen.getByText((content, node) => node?.textContent === "Resource 1")
    ).toBeInTheDocument();
    // Button should still render, but clicking should not throw
    const linkButtons = screen.getAllByRole("button");
    fireEvent.click(linkButtons[linkButtons.length - 1]);
  });

  // Removed prop validation test: TypeScript handles this at compile time
});
