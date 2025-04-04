document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.node');

    const nodeInfo = {
        fundamentals: {
            title: "Chess Fundamentals",
            description: "The foundation of chess knowledge. Learn how the game works and the basic concepts that will guide your chess journey.",
            elo: "0-800",
            content: [
                "Board setup and piece movement",
                "Basic rules (check, checkmate, stalemate)",
                "Piece values and basic principles",
                "Capturing and special moves (castling, en passant)",
                "Setting up a chess board correctly"
            ],
            resources: [
                "Chess.com's How to Play",
                "Lichess Learn Chess",
                "Chess for Beginners by Magnus Carlsen"
            ]
        },
        