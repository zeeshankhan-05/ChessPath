import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import QuickStartSection from "./QuickStartSection";
import { MemoryRouter } from "react-router-dom";

describe("QuickStartSection", () => {
  it("renders section header and ELO cards", () => {
    render(
      <MemoryRouter>
        <QuickStartSection />
      </MemoryRouter>
    );
    expect(screen.getByText(/Quick Start/i)).toBeInTheDocument();
    expect(
      screen.getByText(/What\'s your current playing strength/i)
    ).toBeInTheDocument();
    // Use getAllByText for ELO cards
    const eloCards = screen.getAllByText(/ELO/i);
    expect(eloCards.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/0-800 ELO/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1800\+ ELO/i).length).toBeGreaterThan(0);
  });

  it("selects an ELO and shows personalized plan", () => {
    render(
      <MemoryRouter>
        <QuickStartSection />
      </MemoryRouter>
    );
    const eloCards = screen.getAllByText(/0-800 ELO/i);
    // Click the first matching card
    fireEvent.click(eloCards[0].closest("div"));
    expect(
      screen.getByText(/Your Personalized Study Plan/i)
    ).toBeInTheDocument();
  });

  it("handles rapid ELO selection changes", () => {
    render(
      <MemoryRouter>
        <QuickStartSection />
      </MemoryRouter>
    );
    const beginnerCards = screen.getAllByText(/0-800 ELO/i);
    const advancedCards = screen.getAllByText(/1800\+ ELO/i);
    fireEvent.click(beginnerCards[0].closest("div"));
    fireEvent.click(advancedCards[0].closest("div"));
    expect(
      screen.getByText(/Your Personalized Study Plan/i)
    ).toBeInTheDocument();
  });

  it("does not break with no ELO selected", () => {
    render(
      <MemoryRouter>
        <QuickStartSection />
      </MemoryRouter>
    );
    expect(
      screen.queryByText(/Your Personalized Study Plan/i)
    ).not.toBeInTheDocument();
  });
});
