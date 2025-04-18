function aiMove(board) {
    let emptyColumns = [];
    for (let i = 0; i < 7; i++) {
        if (board[0][i] === null) {
            emptyColumns.push(i);
        }
    }
    const randomColumn = emptyColumns[Math.floor(Math.random() * emptyColumns.length)];
    return randomColumn;
}
